// Import the functions you need from the SDKs you need
import puppeteer from "puppeteer";
import { currentDate } from "./helper.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  storage,
  db,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "./cloud.js";

const newspageUrl = "https://orf.at/";

(async () => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    let page = await browser.newPage();
    await page.goto(newspageUrl, { waitUntil: "networkidle2" });
    // check if cookie-accept window shows up
    let cookieWindow = (await page.$("#didomi-notice")) || "";
    if (cookieWindow !== "") {
      await page.click("#didomi-notice-agree-button");
    }
    // loop through all news elements and return the actual news link from the a element
    let newsElements = await page.evaluate(() => {
      const elements = document.querySelector(
        ".oon-grid.oon-grid-alias-news>div.oon-grid-top"
      ).children;
      return [...elements].map((el) => {
        return el.querySelector("a").href;
      });
    });

    // loop through each news and add object to newsList
    const newsList = [];
    for (var i = 0, len = newsElements.length; i < len; i++) {
      page = await browser.newPage();
      await page.goto(newsElements[i], { waitUntil: "networkidle0" });
      await page.waitForTimeout(8000);
      await page.waitForSelector(".image.opener img");
      let image = await page.evaluate(() => {
        return document.querySelector(".image.opener img").srcset;
      });
      let keyword = await page.evaluate(() => {
        return document.querySelector(".keyword").textContent;
      });
      let header = await page.evaluate(() => {
        return document.querySelector(".story-lead-headline").textContent;
      });
      let leadText = await page.evaluate(() => {
        return document.querySelector(".story-lead-text").innerText;
      });

      // upload pdf to firebase storage
      const pdfRef = ref(
        storage,
        header.replace(/\s/g, "-").replace(``, "") + ".pdf"
      );
      const pdf = await page.pdf({ format: "A4" });
      await uploadBytes(pdfRef, pdf, { contentType: "application/pdf" });
      // get url of uploaded file
      let pdfUrl = await getDownloadURL(pdfRef);

      // push object
      newsList.push({
        image,
        keyword,
        header,
        leadText,
        pdfUrl,
        date: currentDate(),
      });
    }

    // POST to firebase

    for (const news of newsList) {
      try {
        const newsRef = await collection(db, "news");
        const q = await query(newsRef, where("header", "==", news.header));

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          await addDoc(collection(db, "news"), news);
        }
      } catch (err) {
        console.error(err);
      }
    }
    console.log("done");
    browser.close();
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();
