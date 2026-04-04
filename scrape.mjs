import fs from 'fs';
import path from 'path';

const imageIDs = [
  "1550751827-4bd374c3f58b",  
  "1451187580459-43490279c0fa", 
  "1518770660439-4636190af475",
  "1526374965328-7f61d4dc18c5",
  "1504384308090-c894fdcc538d",
  "1531297172867-4f50fbdcece8",
  "1519389950473-47ba0277781c",
  "1555949963-ff9fe0c870eb",
  "1542831371-29b0f74f9713",
  "1558494949-ef010cbdcc31",
  "1618401471353-b98afee0b2eb",
  "1525547719571-a2d4ac8945e2",
  "1504384764586-bb4cdc1707b0",
  "1498050108023-c5249f4df085",
  "1563206767-5b18f218e8de",
  "1515879218367-8466d910aaa4",
  "1517336714731-489689fd1ca8",
  "1516259762381-22954d7d3ad2",
  "1510915361894-faa8b2dca943",
  "1499951360447-b19be8fe80f5",
  "1544197150-b99a580bb7a8",
  "1506399558188-acca6f8cbf41",
  "1555066931-4365d14bab8c",
  "1562408590-eae993c10bc8"
];

async function fetchImages() {
  const targetDir = path.join(process.cwd(), 'public', 'scraped');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  for (let i = 0; i < imageIDs.length; i++) {
    try {
      const url = `https://images.unsplash.com/photo-${imageIDs[i]}?auto=format&fit=crop&w=800&q=80`;
      const res = await fetch(url);
      const buffer = await res.arrayBuffer();
      
      const filePath = path.join(targetDir, `tech-${i + 1}.jpg`);
      fs.writeFileSync(filePath, Buffer.from(buffer));
      console.log(`Saved ${filePath}`);
    } catch (err) {
      console.error(`Failed to download tech-${i + 1}.jpg`);
    }
  }
}

fetchImages();
