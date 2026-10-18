document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
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

  // 2. Download Trigger Toast Notification (Only on user click, 4s auto-dismiss)
  const downloadBtns = document.querySelectorAll('.btn-download-action');
  const toast = document.getElementById('download-toast');
  const toastClose = document.getElementById('toast-close');
  let toastTimer = null;

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (toast) {
        if (toastTimer) clearTimeout(toastTimer);

        toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
        toast.classList.add('translate-y-0', 'opacity-100');

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

  // 3. Interactive Showcase Screenshot Switcher
  const screenTabs = document.querySelectorAll('.screen-tab-btn');
  const screenImg = document.getElementById('showcase-screen-img');
  const screenTitle = document.getElementById('showcase-screen-title');
  const screenDesc = document.getElementById('showcase-screen-desc');

  const screenData = {
    home: {
      src: 'assets/images/screen-home.png',
      title: 'হোম ড্যাশবোর্ড ও ডিজিটাল ফায়ারওয়াল',
      desc: 'লাইভ প্রটেকশন স্ট্যাটাস, দৈনিক হাদিস ও বাণী, এমার্জেন্সি প্যানিক বাটন এবং এক-ক্লিকে কুইক দরূদ ও তসবিহ গণনা।'
    },
    streak: {
      src: 'assets/images/screen-streak.png',
      title: 'Iron Will — অবিচল ইচ্ছাশক্তি ও স্ট্রিক ট্র্যাকার',
      desc: 'সেকেন্ড ধরে লাইভ টাইম কাউন্টার, মাইলস্টোন সেলিব্রেশন উইন্ডো এবং ভুল থেকে শেখার জন্য বৈজ্ঞানিক রিল্যাপ্স রিসেট ফর্ম।'
    },
    routine: {
      src: 'assets/images/screen-routine.png',
      title: 'রুটিন পোর্টাল — ৫টি ডেডিকেটেড মডিউল',
      desc: 'ডেইলি টার্গেট, ডায়নামিক টাচ তসবিহ, শর্তযুক্ত অ্যালার্ম, নামাজের অটো-ভাইব্রেট এবং স্ক্রিন আনলক গার্ড নিরাপত্তা।'
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

  // 4. Panic SOS Interactive Simulation Modal
  const panicTriggerBtn = document.getElementById('btn-panic-trigger');
  const panicModal = document.getElementById('panic-sos-modal');
  const panicCloseBtn = document.getElementById('btn-panic-close');
  const breathingCounter = document.getElementById('breathing-phase-text');
  let breathingInterval = null;

  function runBreathingCycle() {
    let step = 0;
    const phases = [
      '৪ সেকেন্ড গভীর শ্বাস নিন...',
      '৭ সেকেন্ড শ্বাস ধরে রাখুন...',
      '৮ সেকেন্ড ধীরে ধীরে শ্বাস ছাড়ুন...'
    ];
    if (breathingCounter) breathingCounter.textContent = phases[0];

    breathingInterval = setInterval(() => {
      step = (step + 1) % phases.length;
      if (breathingCounter) breathingCounter.textContent = phases[step];
    }, 4500);
  }

  if (panicTriggerBtn && panicModal) {
    panicTriggerBtn.addEventListener('click', () => {
      panicModal.classList.remove('hidden');
      runBreathingCycle();
    });
  }

  if (panicCloseBtn && panicModal) {
    panicCloseBtn.addEventListener('click', () => {
      panicModal.classList.add('hidden');
      if (breathingInterval) clearInterval(breathingInterval);
    });
  }

  // 5. Donation / Hadia Copy Button
  const copyBtns = document.querySelectorAll('.btn-copy-number');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const num = btn.getAttribute('data-number');
      if (num) {
        navigator.clipboard.writeText(num).then(() => {
          const original = btn.innerHTML;
          btn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i><span>কপি হয়েছে!</span>';
          if (window.lucide) lucide.createIcons();
          setTimeout(() => {
            btn.innerHTML = original;
            if (window.lucide) lucide.createIcons();
          }, 2500);
        });
      }
    });
  });

  // 6. FAQ Accordion Toggle
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
