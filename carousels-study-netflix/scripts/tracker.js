(function (win) {
  'use strict';

  var listeners = [],
    doc = win.document,
    MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
    observer;

  function ready(selector, fn) {
    // Store the selector and callback to be monitored
    listeners.push({
      selector: selector,
      fn: fn
    });
    if (!observer) {
      // Watch for changes in the document
      observer = new MutationObserver(check);
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true
      });
    }
    // Check if the element is currently in the DOM
    check();
  }

  function check() {
    // Check the DOM for elements matching a stored selector
    for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
      listener = listeners[i];
      // Query for elements matching the specified selector
      elements = doc.querySelectorAll(listener.selector);
      for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
        element = elements[j];
        // Make sure the callback isn't invoked with the 
        // same element more than once
        if (!element.ready) {
          element.ready = true;
          // Invoke the callback with the element
          listener.fn.call(element, element);
        }
      }
    }
  }

  // Expose `ready`
  win.ready = ready;

})(this);

let userStudyDB;
const userStudyDBRequest = window.indexedDB.open("user_study_db", 1);

userStudyDBRequest.onerror = (event) => {
  console.error(`Database error: ${event.target.errorCode}`);
};
userStudyDBRequest.onsuccess = (event) => {
  userStudyDB = event.target.result;

  dumpElementPositions();
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

const getMousePosition = e => {
  let cx;
  let cy;

  if (!e)
    return { "x": -1, "y": -1 };

  if (e.pageX || e.pageY) {
    cx = e.pageX;
    cy = e.pageY;
  } else if (e.clientX || e.clientY) {
    cx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    cy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;

  return { "x": cx, "y": cy };
};

const writePositionToUserStudyDB = pos => {
  const transaction = userStudyDB.transaction(["positions"], "readwrite");

  transaction.onerror = (event) => {
    console.error(`Database error: ${event.target.errorCode}`);
  };

  const objectStore = transaction.objectStore("positions");
  objectStore.add(pos);
};

const dumpElementPositions = (e) => {
  const carousel_elements = document.getElementsByClassName('content');
  let positions = [];

  // get the position of the carousel elements (movie posters )
  for (let el of carousel_elements) {
    let rect = el.getBoundingClientRect();

    
    positions.push({
      "id": el.getElementsByTagName('img')[0].getAttribute('src'),
      "position": [rect.top, rect.right, rect.bottom, rect.left]
    });

    //only get the first carousel movie poster 
    break;
  };

  // get the position of the carousel names (genre text)
  const carousel_names = document.getElementsByClassName('carousel_name');
  for (let el of carousel_names) {
    let rect = el.getBoundingClientRect();

    positions.push({
      "id": el.textContent,
      "position": [rect.top, rect.right, rect.bottom, rect.left]
    });
    
    //only get the first carousel name
    break;
  };

  if (positions.length === 0) {
    setTimeout(dumpElementPositions, 100, e);
    return;
  }

  const task_id = document.location.href.split("_")[4].split(".")[0];

  writePositionToUserStudyDB({
    "task_id": task_id,
    "timestamp": Date.now(),
    "event_type": e ? e.type : "page_init",
    "mouse_coordinates": getMousePosition(e),
    "positions": positions
  });
};

//Comment above function and uncomment below function to get all the positions from indexedDB
//Open page, click 3 times on first carousel. Scroll fully down, click 3 times on last carousel. 
/*
const dumpElementPositions = (e) => {
  const carousel_elements = document.getElementsByClassName('content');
  let positions = [];

  // get the position of the carousel elements (movie posters )
  for (let el of carousel_elements) {
    let rect = el.getBoundingClientRect();

    
    positions.push({
      "id": el.getElementsByTagName('img')[0].getAttribute('src'),
      "position": [rect.top, rect.right, rect.bottom, rect.left]
    });

    //only get the first carousel movie poster 
    //break;
  };

  // get the position of the carousel names (genre text)
  const carousel_names = document.getElementsByClassName('carousel_name');
  for (let el of carousel_names) {
    let rect = el.getBoundingClientRect();

    positions.push({
      "id": el.textContent,
      "position": [rect.top, rect.right, rect.bottom, rect.left]
    });
    
    //only get the first carousel name
    //break;
  };

  //get the position of the prev swipe buttons
  const prev_swipe_buttons = document.getElementsByClassName('slick-prev slick-arrow');
  for (let el of prev_swipe_buttons) {
    let rect = el.getBoundingClientRect();

    positions.push({
      "id": el.id,
      "position": [rect.top, rect.right, rect.bottom, rect.left]
    });
  };

  //get the position of the next swipe buttons
  const next_swipe_buttons = document.getElementsByClassName('slick-next slick-arrow');
  for (let el of next_swipe_buttons) {
    let rect = el.getBoundingClientRect();

    positions.push({
      "id": el.id,
      "position": [rect.top, rect.right, rect.bottom, rect.left]
    });
  };


  if (positions.length === 0) {
    setTimeout(dumpElementPositions, 100, e);
    return;
  }

  const task_id = document.location.href.split("_")[4].split(".")[0];

  writePositionToUserStudyDB({
    "task_id": task_id,
    "timestamp": Date.now(),
    "event_type": e ? e.type : "page_init",
    "mouse_coordinates": getMousePosition(e),
    "positions": positions
  });
};
*/

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

ready('.content', function (element) {
  let orig_img_path = '';


    element.addEventListener("mouseenter", function () {
      const img = element.getElementsByTagName("img")[0];
      orig_img_path = img.getAttribute('src');
      img.setAttribute("src", "./assets/images/white.png");

      const details = element.getElementsByClassName("details")[0];
      details.classList.remove("hidden");
    });

    element.addEventListener("mouseleave", function () {
      const img = element.getElementsByTagName("img")[0];
      if (orig_img_path !== '') {
        img.setAttribute("src", orig_img_path);
      }

      const details = element.getElementsByClassName("details")[0];
      details.classList.add("hidden");
    });

  element.addEventListener("click", (event) => {
    window.location.href = "./Final_Carousel_study_screen_end.html";
  });
});

ready('body', (element) => {
  element.addEventListener('click', (event) => {
    dumpElementPositions(event);
  });
  element.addEventListener('wheel', (event) => {
    dumpElementPositions(event);
  });
});
