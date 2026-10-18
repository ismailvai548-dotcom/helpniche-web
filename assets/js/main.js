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

  // 4. FAQ Accordion Toggle
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
