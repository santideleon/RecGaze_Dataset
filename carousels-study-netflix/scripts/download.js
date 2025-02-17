let userStudyDB;
const userStudyDBRequest = window.indexedDB.open("user_study_db", 1);

userStudyDBRequest.onerror = (event) => {
    console.error(`Database error: ${event.target.errorCode}`);
};
userStudyDBRequest.onsuccess = (event) => {
    userStudyDB = event.target.result;
};

userStudyDBRequest.onupgradeneeded = (event) => {
    userStudyDB = event.target.result;

    const objectStore = userStudyDB.createObjectStore("positions", { keyPath: "timestamp" });

    objectStore.transaction.oncomplete = (event) => {
        const positionsObjectStore = userStudyDB
            .transaction("positions", "readwrite")
            .objectStore("positions");
    };
};

const downloadIndexedDBDump = () => {

    Object.assign(document.createElement("a"), {
        href: `data:application/JSON, ${encodeURIComponent(
            JSON.stringify(
                carouselUserStudyPositions,
                null,
                2
            )
        )}`,
        download: "positions_db_dump",
    }).click()
};

const dumpAllPositionsFromIndexedDB = () => {
    const objectStore = userStudyDB.transaction("positions").objectStore("positions");

    objectStore.getAll().onsuccess = (event) => {
        carouselUserStudyPositions = event.target.result;
        downloadIndexedDBDump();
    };
};
