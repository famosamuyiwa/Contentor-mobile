import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { database } from "../config/firebase";
import { useEffect, useState } from "react";

const usePortfolioItems = (userId: string) => {
    const [portfolioGridItems, setPortfolioGridItems] = useState<Media[]>([])
    const [portfolioListItems, setPortfolioListItems] = useState<Media[]>([])

    useEffect(() => {
        //get data back immediately it has been saved to db
        const portfolioRef = collection(database, "portfolio")
        const q = query(portfolioRef, where("userId", "==", userId), orderBy('createdAt', 'desc'));
    
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const newMedia: Media[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            userId: doc.data().userId,
            fileType: doc.data().fileType,
            url: doc.data().url,
            createdAt: doc.data().createdAt,
            description: doc.data().description,
            coverUrl: doc.data().coverUrl
          }));
    
    
          setPortfolioGridItems(newMedia.filter(item => item.fileType === 'image' || item.fileType === 'video'))
          setPortfolioListItems(newMedia.filter(item => item.fileType === 'application/pdf' || item.fileType === 'audio'))
    
        })
    
        //unmount to avoid performance issues
        return () => unsubscribe()
    
      }, [userId])

      return { portfolioGridItems, portfolioListItems }
}

export default usePortfolioItems