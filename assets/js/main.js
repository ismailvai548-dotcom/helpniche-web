document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navbar Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 2. OS Auto Detection & Platform Switching
  const isWindows = navigator.userAgent.indexOf('Win') !== -1;
  const isAndroid = navigator.userAgent.indexOf('Android') !== -1;

  const btnPlatformAndroid = document.getElementById('btn-platform-android');
  const btnPlatformWindows = document.getElementById('btn-platform-windows');
  
  const androidPanel = document.getElementById('download-panel-android');
  const windowsPanel = document.getElementById('download-panel-windows');

  function setPlatform(platform) {
    if (platform === 'windows') {
      if (btnPlatformWindows) {
        btnPlatformWindows.classList.add('active');
        btnPlatformWindows.classList.remove('inactive');
      }
      if (btnPlatformAndroid) {
        btnPlatformAndroid.classList.remove('active');
        btnPlatformAndroid.classList.add('inactive');
      }
      if (windowsPanel) windowsPanel.classList.remove('hidden');
      if (androidPanel) androidPanel.classList.add('hidden');
    } else {
      if (btnPlatformAndroid) {
        btnPlatformAndroid.classList.add('active');
        btnPlatformAndroid.classList.remove('inactive');
      }
      if (btnPlatformWindows) {
        btnPlatformWindows.classList.remove('active');
        btnPlatformWindows.classList.add('inactive');
      }
      if (androidPanel) androidPanel.classList.remove('hidden');
      if (windowsPanel) windowsPanel.classList.add('hidden');
    }
  }

  if (btnPlatformAndroid) {
    btnPlatformAndroid.addEventListener('click', () => setPlatform('android'));
  }
  if (btnPlatformWindows) {
    btnPlatformWindows.addEventListener('click', () => setPlatform('windows'));
  }

  // Default selection based on user's OS
  if (isWindows && !isAndroid) {
    setPlatform('windows');
  } else {
    setPlatform('android');
  }

  // 3. Interactive Showcase Screenshot Switcher
  const screenTabs = document.querySelectorAll('.screen-tab-btn');
  const screenImg = document.getElementById('showcase-screen-img');
  const screenTitle = document.getElementById('showcase-screen-title');
  const screenDesc = document.getElementById('showcase-screen-desc');

  const screenData = {
    home: {
      src: 'assets/images/screen-home.png',
      title: 'সেন্ট্রাল ফোকাস ও ডিজিটাল ফায়ারওয়াল',
      desc: 'সোশ্যাল মিডিয়া, ক্ষতিকর সাইট ও নেটওয়ার্ক ট্র্যাফিক সম্পূর্ণ নিজের নিয়ন্ত্রণে রেখে উৎপাদনশীলতা বহু গুণ বাড়িয়ে তুলুন।'
    },
    streak: {
      src: 'assets/images/screen-streak.png',
      title: 'Iron Will — অবিচল ইচ্ছাশক্তি ও অগ্রগতি',
      desc: 'লাইভ প্রগ্রেস ট্র্যাকার, ডিজিটাল ডিটক্স কাউন্টডাউন এবং ধাপে ধাপে নিজের অভ্যন্তরীণ শক্তি বৃদ্ধির এক বিজ্ঞানসম্মত প্ল্যাটফর্ম।'
    },
    routine: {
      src: 'assets/images/screen-routine.png',
      title: 'আধ্যাত্মিক শৃঙ্খলা ও আমল রিমাইন্ডার',
      desc: 'ওয়াক্তভিত্তিক নামাজের অ্যালার্ম, বুদ্ধিমান ভাইব্রেশন মোড এবং স্মার্ট ডিজিটাল তসবিহের সমন্বয়ে পরিচ্ছন্ন জীবনধারা।'
    }
  };

  screenTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-screen');
      if (screenData[target] && screenImg) {
        screenTabs.forEach(t => {
          t.classList.remove('bg-emerald-500/20', 'border-emerald-500', 'text-emerald-400');
          t.classList.add('bg-slate-900/60', 'border-slate-800', 'text-slate-400');
        });
        tab.classList.remove('bg-slate-900/60', 'border-slate-800', 'text-slate-400');
        tab.classList.add('bg-emerald-500/20', 'border-emerald-500', 'text-emerald-400');

        screenImg.style.opacity = '0';
        setTimeout(() => {
          screenImg.src = screenData[target].src;
          if (screenTitle) screenTitle.textContent = screenData[target].title;
          if (screenDesc) screenDesc.textContent = screenData[target].desc;
          screenImg.style.opacity = '1';
        }, 160);
      }
    });
  });

  // 4. Download Trigger & Dynamic Toast
  const downloadBtns = document.querySelectorAll('.btn-download-action');
  const toast = document.getElementById('download-toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMsg = document.getElementById('toast-msg');
  const toastClose = document.getElementById('toast-close');
  const counterSpan = document.getElementById('live-download-counter');

  let baseDownloads = 2480;
  let storedCount = localStorage.getItem('helpniche_pro_downloads');
  if (!storedCount) {
    localStorage.setItem('helpniche_pro_downloads', baseDownloads);
    storedCount = baseDownloads;
  }
  if (counterSpan) {
    counterSpan.textContent = Number(storedCount).toLocaleString('bn-BD');
  }

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const isWinBtn = btn.getAttribute('data-os') === 'windows';
      
      let current = Number(localStorage.getItem('helpniche_pro_downloads') || baseDownloads) + 1;
      localStorage.setItem('helpniche_pro_downloads', current);
      if (counterSpan) {
        counterSpan.textContent = current.toLocaleString('bn-BD');
      }

      if (toast) {
        if (isWinBtn) {
          if (toastTitle) toastTitle.textContent = 'উইন্ডোজ ইনস্টলার ডাউনলোড শুরু হয়েছে!';
          if (toastMsg) toastMsg.textContent = 'ডাউনলোড শেষে Helpniche-Setup.exe ফাইলটি রান করে ইন্সটলেশন সম্পন্ন করুন।';
        } else {
          if (toastTitle) toastTitle.textContent = 'Android APK ডাউনলোড শুরু হয়েছে!';
          if (toastMsg) toastMsg.textContent = 'ডাউনলোড শেষে ফাইলে ক্লিক করে "Allow Unknown Apps" পারমিশন দিন।';
        }

        toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
        toast.classList.add('translate-y-0', 'opacity-100');

        setTimeout(() => {
          toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
        }, 7500);
      }
    });
  });

  if (toastClose && toast) {
    toastClose.addEventListener('click', () => {
      toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    });
  }

  // 5. FAQ Accordion Toggle
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector('.faq-icon');
      const isOpen = !content.classList.contains('hidden');

      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
});
