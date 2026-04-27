(ns advent-of-code.day1
  "Day 1: Calorie Counting"
  (:require [advent-of-code.util :as util]))

(defn group-data [data]
  (->> (.split data "\n\n")
       (map #(.split % "\n"))
       (map (fn [group]
              (map #(Integer/parseInt %) group)))))

(defn -main [& args]
  (let [input (util/get-input 1 "data")
        data (group-data input)
        sums (map #(reduce + %) data)
        answer1 (apply max sums)
        answer2 (->> sums sort (take-last 3) (reduce +))]
    (println [answer1 answer2])))


(advent-of-code.day1/-main)