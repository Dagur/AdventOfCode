(ns advent-of-code.util
  (:require [clojure.java.io :as io]))

(defn get-input
  "Fetches input from the resources folder based on day and filename."
  [day file]
  (if-let [res (io/resource (format "day%d_%s.txt" day file))]
    (slurp res)
    (throw (Exception. (str "Resource not found for day " day)))))