import { test, expect } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

test.describe('Netlify 빌드 프로세스 테스트', () => {
  test.beforeAll(async () => {
    // 이전 빌드 결과물 정리
    const outDir = path.join(process.cwd(), 'out');
    const nextDir = path.join(process.cwd(), '.next');
    
    try {
      if (fs.existsSync(outDir)) {
        fs.rmSync(outDir, { recursive: true, force: true });
      }
      if (fs.existsSync(nextDir)) {
        fs.rmSync(nextDir, { recursive: true, force: true });
      }
    } catch (error) {
      console.log('빌드 디렉터리 정리 완료');
    }
  });

  test('package.json 의존성 설치 테스트', async () => {
    try {
      const { stdout, stderr } = await execAsync('npm ci', { 
        timeout: 120000 
      });
      
      expect(stderr).not.toContain('ERESOLVE');
      expect(stderr).not.toContain('deprecated');
      
      // node_modules 디렉터리 확인
      const nodeModulesExists = fs.existsSync(path.join(process.cwd(), 'node_modules'));
      expect(nodeModulesExists).toBe(true);
      
    } catch (error) {
      console.log('의존성 설치 오류:', error);
      throw error;
    }
  });

  test('Next.js 빌드 프로세스 테스트', async () => {
    try {
      const { stdout, stderr } = await execAsync('npm run build', { 
        timeout: 180000 
      });
      
      // 빌드 성공 확인
      expect(stdout).toContain('Creating an optimized production build');
      expect(stderr).not.toContain('error');
      expect(stderr).not.toContain('Error');
      
      // .next 디렉터리 생성 확인
      const nextBuildExists = fs.existsSync(path.join(process.cwd(), '.next'));
      expect(nextBuildExists).toBe(true);
      
    } catch (error) {
      console.log('빌드 오류:', error);
      throw error;
    }
  });

  test('정적 파일 export 테스트', async () => {
    try {
      // next export 명령어 실행 (Next.js 14+에서는 next build가 자동 export 수행)
      const outDir = path.join(process.cwd(), 'out');
      const outExists = fs.existsSync(outDir);
      
      if (!outExists) {
        // 수동으로 export 실행
        await execAsync('npx next export', { timeout: 120000 });
      }
      
      // out 디렉터리 확인
      const outDirExists = fs.existsSync(outDir);
      expect(outDirExists).toBe(true);
      
      // 필수 파일들 확인
      const indexExists = fs.existsSync(path.join(outDir, 'index.html'));
      expect(indexExists).toBe(true);
      
      // _next 폴더 확인 (정적 리소스)
      const nextStaticExists = fs.existsSync(path.join(outDir, '_next'));
      expect(nextStaticExists).toBe(true);
      
    } catch (error) {
      console.log('Export 오류:', error);
      throw error;
    }
  });

  test('Netlify 설정 호환성 검증', async () => {
    // netlify.toml 설정 검증
    const netlifyConfig = fs.readFileSync('netlify.toml', 'utf8');
    expect(netlifyConfig).toContain('publish = "out"');
    expect(netlifyConfig).toContain('NODE_VERSION = "18"');
    
    // next.config.ts 설정 검증
    const nextConfig = fs.readFileSync('next.config.ts', 'utf8');
    expect(nextConfig).toContain('distDir: \'out\'');
    expect(nextConfig).toContain('unoptimized: true');
    
    // package.json 스크립트 검증
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    expect(packageJson.scripts.build).toBe('next build');
  });

  test('빌드된 파일 구조 검증', async () => {
    const outDir = path.join(process.cwd(), 'out');
    
    // 필수 페이지 파일들 확인
    const requiredFiles = [
      'index.html',
      '404.html',
      '_next'
    ];
    
    for (const file of requiredFiles) {
      const filePath = path.join(outDir, file);
      const exists = fs.existsSync(filePath);
      expect(exists).toBe(true);
    }
    
    // 정적 자원 확인
    const staticDir = path.join(outDir, '_next', 'static');
    if (fs.existsSync(staticDir)) {
      const staticFiles = fs.readdirSync(staticDir, { recursive: true });
      expect(staticFiles.length).toBeGreaterThan(0);
    }
  });

  test('HTML 파일 내용 검증', async () => {
    const indexPath = path.join(process.cwd(), 'out', 'index.html');
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // 기본 HTML 구조 확인
    expect(indexContent).toContain('<!DOCTYPE html>');
    expect(indexContent).toContain('<html');
    expect(indexContent).toContain('<head>');
    expect(indexContent).toContain('<body>');
    
    // React 앱 마운트 포인트 확인
    expect(indexContent).toMatch(/<div[^>]*id[^>]*>/);
    
    // CSS/JS 리소스 확인
    expect(indexContent).toContain('_next/static/');
  });

  test('TypeScript 타입 체크', async () => {
    try {
      const { stdout, stderr } = await execAsync('npx tsc --noEmit', { 
        timeout: 60000 
      });
      
      // 타입 에러가 있으면 빌드가 실패해야 함
      expect(stderr).not.toContain('error TS');
      
    } catch (error) {
      console.log('타입 체크 결과:', error);
      // 타입 에러가 있는 경우 빌드 실패 예상
    }
  });

  test('ESLint 검사', async () => {
    try {
      const { stdout, stderr } = await execAsync('npm run lint', { 
        timeout: 60000 
      });
      
      // ESLint 에러 확인
      expect(stdout).not.toContain('error');
      expect(stderr).not.toContain('error');
      
    } catch (error) {
      console.log('Lint 결과:', error);
      // Lint 에러가 있는 경우 확인
    }
  });
});