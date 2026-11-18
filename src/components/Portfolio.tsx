          {tab === 'ai-studio' && (
            <div className={'run-v-drive gap-4 ' + (stopV || modalVideo ? 'stop-all' : '')}>
              {YT_AI_VIDEOS.map((ytId, idx) => {
                const label = 'AI & UGC #' + (idx + 1);
                return (
                  <div key={'yt-' + ytId} className="flex w-[275px] shrink-0 flex-col overflow-hidden rounded-2xl border border-accent/30 bg-[#121215] shadow-xl">
                    <button
                      type="button"
                      onClick={() => { setStopV(true); setModalVideo({ type: 'yt', id: ytId, title: label }); }}
                      style={{ background: 'linear-gradient(145deg, #1a120b 0%, #2d180a 50%, #121215 100%)' }}
                      className="group relative h-[515px] w-full cursor-pointer overflow-hidden focus:outline-none"
                    >
                      <img
                        src={ytThumbUrl(ytId)}
                        alt={label}
                        loading={idx < 5 ? 'eager' : 'lazy'}
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          if (!img.src.includes('hqdefault')) img.src = ytFallbackThumb(ytId);
                        }}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      <span
                        style={{ backgroundColor: '#f47b20', boxShadow: '0 8px 25px rgba(244, 123, 32, 0.55)' }}
                        className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white transition duration-300 group-hover:scale-110"
                      >
                        <Play className="ml-1 h-7 w-7 fill-white text-white" />
                      </span>
                      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#f47b20]/40 bg-black/65 px-3.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                        {t('اضغط للمشاهدة', 'Click to Watch')}
                      </span>
                    </button>
                    <div className="flex items-center justify-between bg-[#121215] px-3.5 py-2 text-xs font-bold text-white border-t border-white/10">
                      <span className="text-accent">{label}</span>
                      <span className="text-white/60">HD</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab === 'script' && (
            <div className={'run-v-drive gap-4 ' + (stopV || modalVideo ? 'stop-all' : '')}>
              {DRIVE_SCRIPT_VIDEOS.map((driveId, idx) => {
                const label = 'Script & Ad #' + (idx + 1);
                return (
                  <div key={'sc-' + driveId} className="flex w-[275px] shrink-0 flex-col overflow-hidden rounded-2xl border border-accent/30 bg-[#121215] shadow-xl">
                    <button
                      type="button"
                      onClick={() => { setStopV(true); setModalVideo({ type: 'drive', id: driveId, title: label }); }}
                      style={{ background: 'linear-gradient(145deg, #1a120b 0%, #2d180a 50%, #121215 100%)' }}
                      className="group relative h-[515px] w-full cursor-pointer overflow-hidden focus:outline-none"
                    >
                      <img
                        src={driveThumbUrl(driveId)}
                        alt={label}
                        loading={idx < 5 ? 'eager' : 'lazy'}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      <span
                        style={{ backgroundColor: '#f47b20', boxShadow: '0 8px 25px rgba(244, 123, 32, 0.55)' }}
                        className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white transition duration-300 group-hover:scale-110"
                      >
                        <Play className="ml-1 h-7 w-7 fill-white text-white" />
                      </span>
                      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#f47b20]/40 bg-black/65 px-3.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                        {t('اضغط للمشاهدة', 'Click to Watch')}
                      </span>
                    </button>
                    <div className="flex items-center justify-between bg-[#121215] px-3.5 py-2 text-xs font-bold text-white border-t border-white/10">
                      <span className="text-accent">{label}</span>
                      <a href={driveViewUrl(driveId)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white/80 hover:text-accent transition">
                        <span>Drive</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div dir="ltr" className="mt-4 flex justify-center gap-3">
          <button type="button" onClick={() => stepV('left')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => stepV('right')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>

      <div id="posts">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink-light dark:text-ink-dark">
            {t('محتوى منشورات السوشيال ميديا', 'Social Media Posts Content')}
          </h3>
          <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
            {POST_URLS.length} {t('تصميم', 'Designs')}
          </span>
        </div>

        <div ref={postTrackRef} dir="ltr" className="no-scrollbar overflow-x-auto py-2 scroll-smooth">
          <div className={'run-p gap-4 ' + (stopP || lightboxImg ? 'stop-all' : '')}>
            {POST_URLS.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxImg(src)}
                className="h-[350px] shrink-0 overflow-hidden rounded-2xl border border-accent/20 bg-card-light dark:bg-card-dark hover:border-accent/60"
              >
                <img
                  src={src}
                  alt={'Post ' + (i + 1)}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-auto object-contain transition duration-500 hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>

        <div dir="ltr" className="mt-4 flex justify-center gap-3">
          <button type="button" onClick={() => stepP('left')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => stepP('right')} className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>

      {modalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md" onClick={() => setModalVideo(null)}>
          <div className="relative flex w-full max-w-[400px] flex-col overflow-hidden rounded-3xl border border-[#f47b20]/60 bg-[#121215] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 bg-[#18181c] px-4 py-2.5">
              <span className="text-xs font-bold text-[#f47b20]">{modalVideo.title}</span>
              <button
                type="button"
                onClick={() => setModalVideo(null)}
                className="grid h-8 w-8 place-items-center rounded-full bg-[#f47b20] text-white transition hover:scale-110"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="relative h-[82vh] max-h-[720px] w-full overflow-hidden bg-black">
              <img
                src={modalVideo.type === 'yt' ? ytThumbUrl(modalVideo.id) : driveThumbUrl(modalVideo.id)}
                alt={modalVideo.title}
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  if (modalVideo.type === 'yt' && !img.src.includes('hqdefault')) img.src = ytFallbackThumb(modalVideo.id);
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <iframe
                src={modalVideo.type === 'yt' ? ytEmbedUrl(modalVideo.id) : drivePreviewUrl(modalVideo.id)}
                title={modalVideo.title}
                className={modalVideo.type === 'yt' ? 'pointer-events-none relative z-10 h-[126%] w-[116%] -translate-x-[8%] -translate-y-[13%] border-0' : 'relative z-10 h-full w-full border-0'}
                allow="autoplay; fullscreen; encrypted-media"
                allowFullScreen
              />
              {modalVideo.type === 'yt' && (
                <>
                  <div className="pointer-events-none absolute top-0 inset-x-0 z-20 h-14 bg-gradient-to-b from-black via-black/95 to-transparent" />
                  <div className="pointer-events-none absolute bottom-0 inset-x-0 z-20 h-28 bg-gradient-to-t from-black via-black/95 to-transparent" />
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {lightboxImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setLightboxImg(null)}>
          <button type="button" onClick={() => setLightboxImg(null)} className="absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-accent transition"><X className="h-6 w-6" /></button>
          <img src={lightboxImg} alt="Preview" className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
