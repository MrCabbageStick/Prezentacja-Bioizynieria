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

let imageViewHidden = true;
const imageView = document.querySelector('[js-image-view]')
const imageViewImage = imageView.querySelector('img')

function showImageView(src){
    imageViewImage.src = src
    imageView.classList.remove('hidden')
    imageViewHidden = false;
}

function hideImageView(){
    imageView.classList.add('hidden')
    imageViewHidden = true;
}

imageView.addEventListener("click", e => {
    if(e.target.isSameNode(imageViewImage)) return

    hideImageView()
})

document.querySelectorAll('img').forEach(img => {
    if (img.isSameNode(imageViewImage)) return

    img.addEventListener("click", e => {
        showImageView(img.src)
    })
})

document.addEventListener("keydown", e => {
    if(e.key === 'Escape' && !imageViewHidden){
        e.preventDefault()
        hideImageView()
    }
})