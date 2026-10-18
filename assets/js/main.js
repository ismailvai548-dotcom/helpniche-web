document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navbar Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 2. Windows PC / Android Mobile Tab Switcher
  const btnPlatformAndroid = document.getElementById('btn-platform-android');
  const btnPlatformWindows = document.getElementById('btn-platform-windows');
  
  const heroDownloadBtn = document.getElementById('hero-main-download-btn');
  const heroBtnText = document.getElementById('hero-btn-text');
  const heroBtnSub = document.getElementById('hero-btn-sub');
  
  const navDownloadBtn = document.getElementById('nav-sticky-download-btn');
  const bottomDownloadBtn = document.getElementById('bottom-cta-download-btn');
  
  const chip1 = document.getElementById('chip-point-1');
  const chip2 = document.getElementById('chip-point-2');
  const chip3 = document.getElementById('chip-point-3');

  let currentPlatform = 'android';

  function applyPlatform(platform) {
    currentPlatform = platform;
    if (platform === 'windows') {
      if (btnPlatformWindows) {
        btnPlatformWindows.classList.add('active');
        btnPlatformWindows.classList.remove('inactive');
      }
      if (btnPlatformAndroid) {
        btnPlatformAndroid.classList.remove('active');
        btnPlatformAndroid.classList.add('inactive');
      }

      // Update Hero Download Button
      if (heroDownloadBtn) {
        heroDownloadBtn.href = 'downloads/helpniche-setup-v1.0.exe';
        heroDownloadBtn.setAttribute('download', 'Helpniche-Setup-v1.0.exe');
        heroDownloadBtn.setAttribute('data-os', 'windows');
      }
      if (heroBtnText) heroBtnText.textContent = '⬇ Windows Setup ডাউনলোড';
      if (heroBtnSub) heroBtnSub.textContent = 'সংস্করণ v1.0 • ~২৪.০ MB • Windows 10/11';

      // Update Sticky Nav Button
      if (navDownloadBtn) {
        navDownloadBtn.href = 'downloads/helpniche-setup-v1.0.exe';
        navDownloadBtn.setAttribute('download', 'Helpniche-Setup-v1.0.exe');
        navDownloadBtn.setAttribute('data-os', 'windows');
        navDownloadBtn.innerHTML = '<i data-lucide="monitor" class="w-3.5 h-3.5"></i><span>PC Setup</span>';
        if (window.lucide) lucide.createIcons();
      }

      // Update Bottom Banner CTA
      if (bottomDownloadBtn) {
        bottomDownloadBtn.href = 'downloads/helpniche-setup-v1.0.exe';
        bottomDownloadBtn.setAttribute('download', 'Helpniche-Setup-v1.0.exe');
        bottomDownloadBtn.setAttribute('data-os', 'windows');
      }

      // Update Compact Chips
      if (chip1) chip1.textContent = 'এক-ক্লিকে ইনস্টলার';
      if (chip2) chip2.textContent = 'লাইটওয়েট ব্যাকগ্রাউন্ড';
      if (chip3) chip3.textContent = 'সুপার ফাস্ট';

    } else {
      if (btnPlatformAndroid) {
        btnPlatformAndroid.classList.add('active');
        btnPlatformAndroid.classList.remove('inactive');
      }
      if (btnPlatformWindows) {
        btnPlatformWindows.classList.remove('active');
        btnPlatformWindows.classList.add('inactive');
      }

      // Update Hero Download Button
      if (heroDownloadBtn) {
        heroDownloadBtn.href = 'downloads/helpniche-v1.0.apk';
        heroDownloadBtn.setAttribute('download', 'Helpniche-v1.0.apk');
        heroDownloadBtn.setAttribute('data-os', 'android');
      }
      if (heroBtnText) heroBtnText.textContent = '⬇ APK ডাউনলোড করুন';
      if (heroBtnSub) heroBtnSub.textContent = 'সংস্করণ v1.0 • মাত্র ৬.৫ MB • Android 6.0+';

      // Update Sticky Nav Button
      if (navDownloadBtn) {
        navDownloadBtn.href = 'downloads/helpniche-v1.0.apk';
        navDownloadBtn.setAttribute('download', 'Helpniche-v1.0.apk');
        navDownloadBtn.setAttribute('data-os', 'android');
        navDownloadBtn.innerHTML = '<i data-lucide="download" class="w-3.5 h-3.5"></i><span>ডাউনলোড APK</span>';
        if (window.lucide) lucide.createIcons();
      }

      // Update Bottom Banner CTA
      if (bottomDownloadBtn) {
        bottomDownloadBtn.href = 'downloads/helpniche-v1.0.apk';
        bottomDownloadBtn.setAttribute('download', 'Helpniche-v1.0.apk');
        bottomDownloadBtn.setAttribute('data-os', 'android');
      }

      // Update Compact Chips
      if (chip1) chip1.textContent = 'কোনো রুট প্রয়োজন নেই';
      if (chip2) chip2.textContent = 'ব্যাটারি অপ্টিমাইজড';
      if (chip3) chip3.textContent = 'সুপার ফাস্ট';
    }
  }

  if (btnPlatformAndroid) {
    btnPlatformAndroid.addEventListener('click', () => applyPlatform('android'));
  }
  if (btnPlatformWindows) {
    btnPlatformWindows.addEventListener('click', () => applyPlatform('windows'));
  }

  // Default to Android
  applyPlatform('android');

  // 3. Download Trigger Toast Notification (Only on user click, 4s auto-dismiss)
  const downloadBtns = document.querySelectorAll('.btn-download-action');
  const toast = document.getElementById('download-toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMsg = document.getElementById('toast-msg');
  const toastClose = document.getElementById('toast-close');
  let toastTimer = null;

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isWin = btn.getAttribute('data-os') === 'windows' || currentPlatform === 'windows';

      if (toast) {
        if (isWin) {
          if (toastTitle) toastTitle.textContent = 'Windows Setup ডাউনলোড শুরু হয়েছে!';
          if (toastMsg) toastMsg.textContent = 'ডাউনলোড শেষে Helpniche-Setup-v1.0.exe ফাইলটি রান করুন।';
        } else {
          if (toastTitle) toastTitle.textContent = 'Helpniche APK ডাউনলোড শুরু হয়েছে!';
          if (toastMsg) toastMsg.textContent = 'ডাউনলোড সম্পন্ন হলে ফাইলটি ওপেন করে ইনস্টল করুন।';
        }

        // Clear existing timer if any
        if (toastTimer) clearTimeout(toastTimer);

        toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
        toast.classList.add('translate-y-0', 'opacity-100');

        // Auto dismiss strictly after 4 seconds
        toastTimer = setTimeout(() => {
          toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
        }, 4000);
      }
    });
  });

  if (toastClose && toast) {
    toastClose.addEventListener('click', () => {
      if (toastTimer) clearTimeout(toastTimer);
      toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    });
  }

  // 4. Interactive Showcase Screenshot Switcher
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
        }, 150);
      }
    });
  });

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
