import { SessionTokenCache } from "../session-token-cache";

const DB_NAME = "unleash";
const DS_NAME = "auth";
export class SessionTokenCacheImp implements SessionTokenCache
{
    
    set(embedId: string, token: string,sessionToken:string):Promise<void>{
        return new Promise<void>((res,rej)=>{
            // Open the database
            const request = indexedDB.open(DB_NAME);
    
            request.onerror = function (event) {
                rej("Error opening database:"+ (<any> event).target.error);
            };
    
            // Handle the database upgrade (create object store if not exists)
            request.onupgradeneeded = function (event) {
                const db = (<any>event).target.result;
                
                if (!db.objectStoreNames.contains(DS_NAME)) {
                    db.createObjectStore(DS_NAME);
                }
            };
    
            // Handle the successful database opening
            request.onsuccess = function (event) {
                const db = (<any>event).target.result;
    
                // Transaction to read from the object store
                const transaction = db.transaction([DS_NAME],"readwrite");
                const objectStore = transaction.objectStore(DS_NAME);
    
                // Specify the key you want to read
                const key = embedId+"##"+token;
    
                // Request to get the value associated with the key
                const getRequest = objectStore.put({sessionToken},key);
    
                getRequest.onsuccess = function (event) {
                    const result = event.target.result;
    
                    if (result) {
                        // The value associated with the key
                        res(result.sessionToken); // Replace with your actual property name
    
                        
                    } else {
                        res(null);
                    }
                };
    
                getRequest.onerror = function (event) {
                    rej("Error reading value:"+ event.target.error);
                };
    };
    });
    }

    get(embedId: string, token: string): Promise<string> {
        return new Promise<string>((res,rej)=>{
        // Open the database
        const request = indexedDB.open(DB_NAME);

        request.onerror = function (event) {
            rej("Error opening database:"+ (<any> event).target.error);
        };

        // Handle the database upgrade (create object store if not exists)
        request.onupgradeneeded = function (event) {
            const db = (<any>event).target.result;
            
            if (!db.objectStoreNames.contains(DS_NAME)) {
                db.createObjectStore(DS_NAME);
            }
        };

        // Handle the successful database opening
        request.onsuccess = function (event) {
            const db = (<any>event).target.result;

            // Transaction to read from the object store
            const transaction = db.transaction([DS_NAME], "readonly");
            const objectStore = transaction.objectStore(DS_NAME);

            // Specify the key you want to read
            const key = embedId+"##"+token;

            // Request to get the value associated with the key
            const getRequest = objectStore.get(key);

            getRequest.onsuccess = function (event) {
                const result = event.target.result;

                if (result) {
                    // The value associated with the key
                    res(result.sessionToken); // Replace with your actual property name

                    
                } else {
                    res(null);
                }
            };

            getRequest.onerror = function (event) {
                rej("Error reading value:"+ event.target.error);
            };
};
});
    }
    
}