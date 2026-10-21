'use strict';

const steps = [
  {
    title: 'Cung cấp tài liệu',
    description: 'Tệp Word sẵn sàng gửi để rà soát PLO.',
    evidence: 'Màn hình thể hiện một tệp Word ở trạng thái “Sẵn sàng gửi” cùng yêu cầu phân tích PLO. Ảnh này chưa chứng minh việc trích xuất đã hoàn tất.',
    source: 'assets/input.webp',
    width: 1009,
    height: 247,
    alt: 'Ảnh T-CORA thật: tệp Word đính kèm ở trạng thái Sẵn sàng gửi và yêu cầu phân tích các PLO trong file CTĐT.',
    caption: 'Vùng cắt từ TC_WEB_01_input_prompt.png. Minh họa thao tác cung cấp tài liệu, chưa xác minh cùng phiên với các màn hình sau.'
  },
  {
    title: 'Nhận diện vấn đề',
    description: 'Nhận diện cách diễn đạt PLO cần xem xét.',
    evidence: 'Ở PLO1, ảnh nhận xét từ “tốt” mang tính chủ quan, khó đo lường. Ở PLO2, ảnh lưu ý nhiều động từ chưa đồng nhất và cách diễn đạt “sức khỏe tốt”.',
    source: 'assets/analysis.webp',
    width: 795,
    height: 495,
    alt: 'Bảng rà soát PLO1 và PLO2: bằng chứng, nguồn áp dụng và nhận định về cách diễn đạt theo SMART, OBE.',
    caption: 'Vùng cắt từ TC_WEB_02_analysis.png. Bảng gốc có phần nằm ngoài vùng chụp; chỉ diễn giải những nội dung nhìn thấy.'
  },
  {
    title: 'Gợi ý cải tiến',
    description: 'Gợi ý điều chỉnh PLO để chuyên gia thẩm định.',
    evidence: 'Ảnh đặt vấn đề của PLO1–PLO3 cạnh gợi ý diễn đạt: rút gọn câu, tập trung vào kỹ năng và chuyển sang hành vi chủ động. Đây là đề xuất, chưa phải thay đổi đã được duyệt.',
    source: 'assets/recommendation.webp',
    width: 801,
    height: 512,
    alt: 'Bảng T-CORA thật về vấn đề nội hàm PLO1, PLO2, PLO3 và gợi ý cải thiện cách diễn đạt theo SMART, OBE.',
    caption: 'Vùng cắt từ TC_WEB_03_recommendation.png. Khuyến nghị minh họa cần được người phụ trách chuyên môn thẩm định.'
  }
];

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panel = document.querySelector('#walk-panel');
const previous = document.querySelector('#step-previous');
const next = document.querySelector('#step-next');
const stepImage = document.querySelector('#step-image');
const stepZoom = document.querySelector('#step-zoom');
let currentStep = 0;

function selectStep(index) {
  if (!Number.isInteger(index) || index < 0 || index >= steps.length) return;
  const step = steps[index];
  currentStep = index;
  tabs.forEach((tab, position) => {
    tab.setAttribute('aria-selected', String(position === index));
    tab.tabIndex = position === index ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby', tabs[index].id);
  document.querySelector('#step-title').textContent = step.title;
  document.querySelector('#step-description').textContent = step.description;
  document.querySelector('#step-evidence').textContent = step.evidence;
  document.querySelector('#step-caption').textContent = step.caption;
  document.querySelector('#step-kicker').textContent = `MÀN HÌNH ${String(index + 1).padStart(2, '0')}`;
  document.querySelector('#step-count').textContent = `${String(index + 1).padStart(2, '0')} / 03`;
  stepImage.src = step.source;
  stepImage.alt = step.alt;
  stepImage.width = step.width;
  stepImage.height = step.height;
  stepZoom.dataset.image = step.source;
  stepZoom.dataset.title = step.title;
  stepZoom.dataset.caption = step.caption;
  stepZoom.setAttribute('aria-label', `Phóng to ảnh: ${step.title}`);
  previous.disabled = index === 0;
  next.disabled = index === steps.length - 1;
  panel.classList.remove('panel-enter');
  requestAnimationFrame(() => panel.classList.add('panel-enter'));
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectStep(index));
  tab.addEventListener('keydown', (event) => {
    let target;
    if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') target = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = tabs.length - 1;
    if (target === undefined) return;
    event.preventDefault();
    selectStep(target);
    tabs[target].focus();
  });
});
previous.addEventListener('click', () => {
  selectStep(currentStep - 1);
  if (previous.disabled) tabs[currentStep].focus();
});
next.addEventListener('click', () => {
  selectStep(currentStep + 1);
  if (next.disabled) tabs[currentStep].focus();
});

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
let lightboxTrigger;

document.querySelectorAll('[data-image]').forEach((button) => {
  button.addEventListener('click', () => {
    lightboxTrigger = button;
    const image = button.querySelector('img');
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = image.alt;
    lightboxImage.width = image.width;
    lightboxImage.height = image.height;
    document.querySelector('#lightbox-title').textContent = button.dataset.title;
    document.querySelector('#lightbox-caption').textContent = button.dataset.caption;
    lightbox.showModal();
    document.body.classList.add('modal-open');
    document.querySelector('#lightbox-close').focus();
    document.querySelector('.lightbox-image-wrap').scrollTo(0, 0);
  });
});
document.querySelector('#lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab') return;
  const first = document.querySelector('#lightbox-close');
  const last = document.querySelector('.lightbox-image-wrap');
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
lightbox.addEventListener('click', (event) => {
  if (event.target !== lightbox) return;
  const bounds = lightbox.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) lightbox.close();
});
lightbox.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  lightboxTrigger?.focus({ preventScroll: true });
});

const menuToggle = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#main-nav');
const narrowViewport = window.matchMedia('(max-width: 1023px)');

function closeMenu() {
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.querySelector('#menu-label').textContent = 'Menu';
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  document.querySelector('#menu-label').textContent = open ? 'Đóng' : 'Menu';
});
navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
    if (narrowViewport.matches) document.querySelector(link.hash)?.focus({ preventScroll: true });
  });
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
narrowViewport.addEventListener('change', closeMenu);

const navLinks = [...navigation.querySelectorAll('a')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const active = navLinks.find((link) => link.hash === `#${entry.target.id}`);
    if (!active) return;
    navLinks.forEach((link) => link.removeAttribute('aria-current'));
    active.setAttribute('aria-current', 'location');
  });
}, { rootMargin: '-15% 0px -65% 0px' });
document.querySelectorAll('main > section[id]').forEach((section) => sectionObserver.observe(section));
