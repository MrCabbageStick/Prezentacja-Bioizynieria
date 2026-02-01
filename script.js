const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) return

            const id = entry.target.id
            if(!id) return

            history.replaceState(null, "", `${location.pathname}#${id}`)
        })
    },
    {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    }
)

document.querySelectorAll(".slide").forEach(elem => {
    observer.observe(elem)
})

window.addEventListener("load", () => {
  if (location.hash) {
    document.querySelector(location.hash)?.scrollIntoView();
  }
});