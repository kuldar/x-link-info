function unfuckTwitter(event) {
  const ignoredTags = ["SCRIPT", "IMG", "META", "LINK", "TITLE"];
  const mediaCardSelector = '[data-testid="card.layoutLarge.media"]';
  const darkSchemeMatcher = window.matchMedia("(prefers-color-scheme: dark)");

  if (event?.target?.tagName && !ignoredTags.includes(event?.target?.tagName)) {
    let mediaCards = event.target.querySelectorAll(mediaCardSelector);
    if (mediaCards.length != 0) {
      mediaCards.forEach((card) => {
        const anchorTag = card.querySelector("a[aria-label]");

        if (anchorTag) {
          const url = anchorTag.lastElementChild.textContent;
          const ariaLabel = anchorTag.getAttribute("aria-label");
          const pageTitle = ariaLabel.replace(`${url} `, "");

          // Wrapper
          const ogInfoElement = document.createElement("div");
          ogInfoElement.style.fontFamily = `"TwitterChirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif`;
          ogInfoElement.style.color = darkSchemeMatcher.matches
            ? "white"
            : "black";
          ogInfoElement.style.padding = "1.25rem";
          ogInfoElement.style.borderTop = `1px solid ${
            darkSchemeMatcher.matches ? "#2f3336" : "#cfd9de"
          }`;

          // Title
          const titleElement = document.createElement("div");
          titleElement.style.fontWeight = "bold";
          titleElement.style.margin = "0 0 0.25rem 0";
          titleElement.textContent = pageTitle;

          // Url
          const urlElement = document.createElement("div");
          urlElement.style.opacity = "0.5";
          urlElement.textContent = url;

          // Put them all together
          ogInfoElement.appendChild(titleElement);
          ogInfoElement.appendChild(urlElement);
          card.appendChild(ogInfoElement);

          card.setAttribute("data-processed", "true");
        }
      });
    }
  }
}

document.addEventListener("DOMNodeInserted", unfuckTwitter);
