// ==================== 阅读进度条 ====================
function initReadingProgress() {
  const progressBar = document.createElement('div');
  progressBar.id = 'reading-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    progressBar.style.width = progress + '%';
  });
}

// ==================== 返回顶部按钮 ====================
function initBackToTop() {
  const button = document.createElement('button');
  button.id = 'back-to-top';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-8 8h5v8h6v-8h5z"/></svg>';
  button.setAttribute('aria-label', '返回顶部');
  document.body.appendChild(button);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      button.classList.add('show');
    } else {
      button.classList.remove('show');
    }
  });

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==================== 代码块复制功能 ====================
function initCodeCopy() {
  const codeBlocks = document.querySelectorAll('.highlight');

  codeBlocks.forEach(block => {
    const button = document.createElement('button');
    button.className = 'code-copy-btn';
    button.textContent = '复制';
    button.setAttribute('aria-label', '复制代码');

    button.addEventListener('click', async () => {
      // 获取代码内容，排除行号
      let code = '';
      const codeElement = block.querySelector('code');

      // 尝试获取所有代码行，排除行号元素
      const lines = codeElement.querySelectorAll('.line');
      if (lines.length > 0) {
        // 如果有 .line 元素，只复制这些元素的内容
        code = Array.from(lines).map(line => {
          // 克隆节点以避免修改原始 DOM
          const clone = line.cloneNode(true);
          // 移除行号元素
          const lineNumbers = clone.querySelectorAll('.ln, .lnt');
          lineNumbers.forEach(ln => ln.remove());
          return clone.textContent;
        }).join('\n');
      } else {
        // 如果没有 .line 元素，尝试移除行号后获取内容
        const clone = codeElement.cloneNode(true);
        const lineNumbers = clone.querySelectorAll('.ln, .lnt, .lntd:first-child');
        lineNumbers.forEach(ln => ln.remove());
        code = clone.textContent;
      }

      // 清理多余的空行
      code = code.replace(/\n\n+/g, '\n').trim();

      try {
        await navigator.clipboard.writeText(code);
        button.textContent = '已复制!';
        button.classList.add('copied');

        setTimeout(() => {
          button.textContent = '复制';
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        button.textContent = '复制失败';
        setTimeout(() => {
          button.textContent = '复制';
        }, 2000);
      }
    });

    block.appendChild(button);
  });
}

// ==================== 图片灯箱效果 ====================
function initLightbox() {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<span class="lightbox-close">&times;</span><img src="" alt="">';
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  // 为文章内容中的图片添加点击事件
  const contentImages = document.querySelectorAll('.post-content img');
  contentImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // 关闭灯箱
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // ESC 键关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// ==================== 目录自动高亮 ====================
function initTocHighlight() {
  const toc = document.querySelector('.toc');
  if (!toc) return;

  const tocLinks = toc.querySelectorAll('a');
  const headings = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3, .post-content h4, .post-content h5, .post-content h6');

  if (headings.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-100px 0px -66%',
    threshold: 0
  });

  headings.forEach(heading => {
    observer.observe(heading);
  });
}

// ==================== 阅读时间估算 ====================
function initReadingTime() {
  const content = document.querySelector('.post-content');
  if (!content) return;

  const text = content.textContent;
  const wordsPerMinute = 200; // 中文约 200-300 字/分钟
  const wordCount = text.length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  const postMeta = document.querySelector('.post-meta');
  if (postMeta) {
    const readingTimeElement = document.createElement('span');
    readingTimeElement.className = 'reading-time';
    readingTimeElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
      </svg>
      <span>阅读时间约 ${readingTime} 分钟</span>
    `;
    postMeta.appendChild(readingTimeElement);
  }
}

// ==================== 图片懒加载 ====================
function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ==================== 初始化所有功能 ====================
document.addEventListener('DOMContentLoaded', () => {
  initReadingProgress();
  initBackToTop();
  initCodeCopy();
  initLightbox();
  initTocHighlight();
  initReadingTime();
  initLazyLoad();
});

