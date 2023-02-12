/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"3C4qQfOR7znXLZ1S","label":"social","bookmarks":[{"id":"Iqu1CfpeRu9r1Buk","label":"youtube","url":"https://youtube.com"},{"id":"GXlP5v7yQopRYSKy","label":"instagtam","url":"https://instagram.com"},{"id":"AtssxwOSBADPwa43","label":"reddit","url":"https://reddit.com"}]},{"id":"QUBvtYuRGYGbBcAe","label":"code","bookmarks":[{"id":"zCX3qGZW2ndJ1v4R","label":"github","url":"https://github.com"},{"id":"D0TUXjLdaS60JERU","label":"leetcode","url":"https://leetcode.com"},{"id":"DXzcDPv0y1B8c8o4","label":"book","url":"https://sourceacademy.org/sicpjs/index"}]},{"id":"0VSXLjhM7vXOEJ6M","label":"reddit","bookmarks":[{"id":"Dew6vIL6CMV8XwOH","label":"awesomewm","url":"https://www.reddit.com/r/awesomewm/"},{"id":"FCffRiD8LKM9ERCO","label":"unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"IaVSDagh5CFJwxoW","label":"linux","url":"https://www.reddit.com/r/linux/"}]},{"id":"MHBkyYQl1u2eDF6F","label":"design","bookmarks":[{"id":"47csKIWZSAuyE4K2","label":"terminal","url":"http://terminal.sexy/"},{"id":"qcqczY5edH5hbgp9","label":"gogh","url":"https://gogh-co.github.io/Gogh/"},{"id":"WLis9MP4OdrD93us","label":"nerd","url":"https://www.nerdfonts.com/"}]},{"id":"N2iCAEE1kHcSjLwt","label":"disctionary","bookmarks":[{"id":"azJyQOBXgQWNLCs9","label":"reverso","url":"https://context.reverso.net/%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B4/"},{"id":"aN9Fsbfc1X2uvOn3","label":"deepl","url":"deepl.com"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
