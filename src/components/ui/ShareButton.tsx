'use client';

import { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ShareIcon, ArrowDownTrayIcon, LinkIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

interface ShareButtonProps {
  resultElementId: string;
  percentage: number;
  className?: string;
}

export function ShareButton({ resultElementId, percentage, className = '' }: ShareButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadImage = async () => {
    setIsGenerating(true);
    
    try {
      const element = document.getElementById(resultElementId);
      if (!element) {
        throw new Error('결과 요소를 찾을 수 없습니다.');
      }

      // 불필요한 요소들을 숨김 (광고, 공유 버튼 등)
      const elementsToHide = element.querySelectorAll('[data-hide-in-export="true"]');
      elementsToHide.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });

      // 캡처 옵션 설정
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2, // 고화질
        width: 600, // 모바일과 동일한 비율 유지
        height: 800,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
      });

      // 워터마크 추가
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#666666';
        ctx.textAlign = 'center';
        ctx.fillText('areyoubiased.life', canvas.width / 2, canvas.height - 20);
      }

      // 이미지 다운로드
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `bias-test-result-${percentage}%.png`);
        }
      }, 'image/png');

      // 숨겨진 요소들 다시 표시
      elementsToHide.forEach(el => {
        (el as HTMLElement).style.display = '';
      });

    } catch (error) {
      console.error('이미지 생성 오류:', error);
      alert('이미지 생성 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      alert('링크가 클립보드에 복사되었습니다!');
    } catch (error) {
      console.error('링크 복사 오류:', error);
      alert('링크 복사에 실패했습니다.');
    }
  };

  const handleSocialShare = (platform: 'facebook' | 'twitter') => {
    const url = window.location.origin;
    const text = `편견 테스트 결과: ${percentage}% - 나의 무의식적 편견 수준을 확인해보세요!`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <ShareIcon className="h-5 w-5 mr-2" />
          결과 공유하기
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleDownloadImage}
                  disabled={isGenerating}
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-50`}
                >
                  <ArrowDownTrayIcon className="mr-2 h-5 w-5" />
                  {isGenerating ? '이미지 생성 중...' : '이미지 다운로드'}
                </button>
              )}
            </Menu.Item>
            
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleCopyLink}
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <LinkIcon className="mr-2 h-5 w-5" />
                  링크 복사
                </button>
              )}
            </Menu.Item>
          </div>

          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleSocialShare('facebook')}
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook 공유
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleSocialShare('twitter')}
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter 공유
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}