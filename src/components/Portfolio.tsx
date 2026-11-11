  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <style>{`
        @keyframes smoothScrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: smoothScrollLeft 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-base font-bold text-accent">
          {t('أعمالي', 'Portfolio')}
        </span>
        <h2 className="mt-4 text-2xl font-extrabold text-ink-light dark:text-ink-dark sm:text-[32px]">
          {t('مشاريع وأعمال تثبت النتائج', 'Projects that prove results')}
        </h2>
      </div>

      <div id="social" className="mb-16">
        <h3 className="mb-6 text-lg font-bold text-ink-light dark:text-ink-dark">
          {t('إدارة حسابات السوشيال ميديا', 'Social Media Management')}
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {SHOWCASE.map((s, i) => {
            const data = lang === 'ar' ? s.ar : s.en;
            return (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark transition hover:border-accent/50 hover:-translate-y-1"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={s.img}
                    alt={data.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 p-3">
                    <h4 className="text-xs font-bold leading-snug text-white">{data.title}</h4>
                    <p className="mt-1 text-[10px] leading-tight text-white/75">{data.sub}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div id="videos" className="mb-16">
        <h3 className="mb-5 text-lg font-bold text-ink-light dark:text-ink-dark">{t('فيديوهاتي', 'My Videos')}</h3>
        <div className="mb-5 flex flex-wrap gap-2">
          {VIDEO_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setVideoTab(tab.key);
                setPlayingVideo(null);
              }}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                videoTab === tab.key
                  ? 'bg-accent text-white shadow-lg shadow-accent/30'
                  : 'border border-accent/30 bg-accent/5 text-accent hover:bg-accent/15'
              }`}
            >
              {t(tab.ar, tab.en)}
            </button>
          ))}
        </div>

        <div dir="ltr" className="overflow-hidden py-2">
          <div className="marquee-track gap-4">
            {videosLoop.map((v, i) => {
              const isPlaying = playingVideo === i;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={isPlaying ? t('إيقاف الفيديو', 'Pause video') : t('تشغيل الفيديو', 'Play video')}
                  onClick={() => setPlayingVideo(isPlaying ? null : i)}
                  className="group relative aspect-[9/16] w-[210px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark"
                >
                  <img
                    src={v.poster}
                    alt={lang === 'ar' ? v.ar : v.en}
                    className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${
                      isPlaying ? 'scale-110 opacity-60' : 'group-hover:scale-105'
                    }`}
                  />
                  <span className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
                  <span className={`absolute inset-0 grid place-items-center transition ${isPlaying ? 'bg-accent/10' : ''}`}>
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/90 text-white shadow-lg shadow-accent/40 transition group-hover:scale-110">
                      {isPlaying ? <Pause className="h-6 w-6 fill-white" /> : <Play className="h-6 w-6 fill-white ms-0.5" />}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div id="posts">
        <h3 className="mb-5 text-lg font-bold text-ink-light dark:text-ink-dark">
          {t('محتوى منشورات السوشيال ميديا', 'Social Media Posts Content')}
        </h3>
        <div dir="ltr" className="overflow-hidden py-2">
          <div className="marquee-track gap-4">
            {postsLoop.map((post, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightbox(post)}
                className="group relative aspect-[9/16] w-[210px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark transition hover:border-accent/60"
              >
                <img
                  src={post.img}
                  alt={lang === 'ar' ? post.ar.title : post.en.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            className="relative max-w-lg w-full overflow-hidden rounded-3xl border border-accent/30 bg-card-light dark:bg-card-dark p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-4 end-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <img
                src={lightbox.img}
                alt={lang === 'ar' ? lightbox.ar.title : lightbox.en.title}
                className="h-full w-full object-cover"
              />
            </div>
            <h4 className="mt-4 text-lg font-bold text-ink-light dark:text-ink-dark">
              {lang === 'ar' ? lightbox.ar.title : lightbox.en.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-light/70 dark:text-ink-dark/70">
              {lang === 'ar' ? lightbox.ar.caption : lightbox.en.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

