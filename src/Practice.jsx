if (import.meta.env.MODE === "production") {
    console.log = function () {};
    console.warn = function () {};
    console.error = function () {};
    console.info = function () {};
  }

