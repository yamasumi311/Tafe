"use strict";

const gallery = document.getElementById("gallery")

const overlay=document.getElementById("overlay")

const allImages = gallery.querySelectorAll("img")
const allImageUrls = []
for (let i = 0; i < allImages.length; i++) {
    allImageUrls[i] = allImages[i].getAttribute("data-full-size-url")
}

let currentUrl;

function getLargeImageElement() {
    const placeholder = document.getElementById("large-image-placeholder")
    if (!placeholder) {
        return document.getElementById("large-image")
    }
    const largeImage = document.createElement('img')
    largeImage.id = 'large-image'
    placeholder.parentElement.replaceChild(largeImage, placeholder)
    return largeImage
}

function switchImage(imageUrl) {
    console.log("Switching image to", imageUrl)
    const largeImage = getLargeImageElement()
    largeImage.setAttribute("src", imageUrl)
    currentUrl = imageUrl
}

function openGallery(imageUrl) {
    overlay.classList.remove("hidden")
    document.body.classList.add("no-scroll")
    switchImage(imageUrl)    
}
function closeGallery(event) {
    event.preventDefault()
    console.log("I am closing", overlay)
    overlay.classList.add("hidden")
    document.body.classList.remove("no-scroll")
}

function onClick(event) {
    console.log("I click",event.target)
    const img=event.target
    const url=img.getAttribute("data-full-size-url")
    if (url != null) {
        event.preventDefault()
        openGallery(url)
    }
}

gallery.addEventListener("click", onClick)

const closeButton = document.getElementById("overlay-close")
closeButton.addEventListener("click",closeGallery)

function onKeyPress(event) {
    console.log("Key was pressed", event)
    if (event.key == "Escape") {
        closeGallery(event)
    }
    if (event.key == "ArrowLeft") {
        goToPrevious()
    }
    if (event.key == "ArrowRight") {
        goToNext()
    }
}
document.body.addEventListener("keydown", onKeyPress)

function goToPrevious() {
    console.log("Go to previous", allImageUrls, currentUrl)
   
    for (let i = 0; i < allImageUrls.length; i++) {
        console.log(i, allImageUrls[i])
        if (allImageUrls[i] == currentUrl) {
            console.log("found it", i)
            if (i == 0) {
                switchImage(allImageUrls[allImageUrls.length-1])
            } else {
                switchImage(allImageUrls[i-1])
            }
            break
        }
    }
}

function goToNext() {
    console.log("Go to Next", allImageUrls, currentUrl)
   
    for (let i = 0; i < allImageUrls.length; i++) {
        console.log(i, allImageUrls[i])
        if (allImageUrls[i] == currentUrl) {
            console.log("found it", i)
            if (i == allImageUrls.length-1) {
                switchImage(allImageUrls[0])
            } else {
                switchImage(allImageUrls[i+1])
            }
            break
        }
    }
}
const buttonPrevious = document.getElementById("button-previous")
buttonPrevious.addEventListener("click", goToPrevious)
const buttonNext = document.getElementById("button-next")
buttonNext.addEventListener("click", goToNext)
