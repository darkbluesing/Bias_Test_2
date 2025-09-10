import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Netlify 배포 최종 검증', () => {
  test('정적 파일 구조 검증', async () => {
    const outDir = path.join(process.cwd(), 'out');
    
    // 필수 HTML 파일들 확인
    const requiredFiles = [
      'index.html',
      '404.html',
      'result/index.html',
      'test/index.html'
    ];
    
    for (const file of requiredFiles) {
      const filePath = path.join(outDir, file);
      const exists = fs.existsSync(filePath);
      expect(exists, `${file} should exist`).toBe(true);
      
      // HTML 파일이 비어있지 않은지 확인
      const content = fs.readFileSync(filePath, 'utf8');
      expect(content.length).toBeGreaterThan(0);
      expect(content).toContain('<!DOCTYPE html>');
    }
  });

  test('정적 자원 파일 확인', async () => {
    const outDir = path.join(process.cwd(), 'out');
    
    // _next 폴더와 정적 자원들 확인
    const staticDir = path.join(outDir, '_next');
    expect(fs.existsSync(staticDir)).toBe(true);
    
    // 이미지 파일들 확인
    const images = ['favicon.ico', 'file.svg', 'globe.svg', 'next.svg', 'vercel.svg', 'window.svg'];
    for (const image of images) {
      const imagePath = path.join(outDir, image);
      expect(fs.existsSync(imagePath), `${image} should exist`).toBe(true);
    }
  });

  test('HTML 내용 검증', async () => {
    const outDir = path.join(process.cwd(), 'out');
    
    // 메인 페이지 검증
    const indexPath = path.join(outDir, 'index.html');
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    expect(indexContent).toContain('<!DOCTYPE html>');
    expect(indexContent).toContain('<html');
    expect(indexContent).toContain('_next/static/');
    
    // 결과 페이지 검증
    const resultPath = path.join(outDir, 'result', 'index.html');
    const resultContent = fs.readFileSync(resultPath, 'utf8');
    
    expect(resultContent).toContain('<!DOCTYPE html>');
    expect(resultContent).toContain('<html');
    expect(resultContent).toContain('_next/static/');
  });

  test('Netlify 설정 최종 확인', async () => {
    // netlify.toml 설정 확인
    const netlifyConfig = fs.readFileSync('netlify.toml', 'utf8');
    expect(netlifyConfig).toContain('publish = "out"');
    expect(netlifyConfig).toContain('NODE_VERSION = "20"');
    
    // next.config.ts 설정 확인
    const nextConfig = fs.readFileSync('next.config.ts', 'utf8');
    expect(nextConfig).toContain('output: \'export\'');
    expect(nextConfig).toContain('distDir: \'out\'');
    expect(nextConfig).toContain('unoptimized: true');
  });

  test('라우팅 파일 확인', async () => {
    const outDir = path.join(process.cwd(), 'out');
    
    // SPA 라우팅을 위한 모든 페이지가 HTML로 생성되었는지 확인
    const routes = [
      '',  // index
      'test',
      'result',
      '404'
    ];
    
    for (const route of routes) {
      const htmlFile = route === '' ? 'index.html' : route === '404' ? '404.html' : `${route}/index.html`;
      const filePath = path.join(outDir, htmlFile);
      expect(fs.existsSync(filePath), `Route ${route} should have HTML file`).toBe(true);
    }
  });

  test('package.json 의존성 확인', async () => {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // 중요 의존성들이 있는지 확인
    expect(packageJson.dependencies.next).toBeTruthy();
    expect(packageJson.dependencies.react).toBeTruthy();
    expect(packageJson.dependencies['html2canvas']).toBeTruthy(); // 이미지 다운로드용
    
    // 빌드 스크립트 확인
    expect(packageJson.scripts.build).toBe('next build');
  });

  test('타입 체크 및 린트 확인', async () => {
    // TypeScript 설정 확인
    const tsconfigExists = fs.existsSync('tsconfig.json');
    expect(tsconfigExists).toBe(true);
    
    // ESLint 설정 확인
    const eslintConfigExists = fs.existsSync('eslint.config.mjs');
    expect(eslintConfigExists).toBe(true);
  });
});