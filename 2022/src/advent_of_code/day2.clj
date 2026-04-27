(ns advent-of-code.day2
  "Day 2: Rock Paper Scissors"
  (:require [advent-of-code.util :as util]))

(defn result [round]
  (let [opponent (- (int (first round)) 64)
        me (- (int (last round)) 87)
        x (- opponent me)]
    (case x
      0 (+ 3 me)
      2 (+ 6 me)
      -1 (+ 6 me)
      me)))

(defn fix [round]
  (let [opponent (first round)
        outcome (last round)
        move (case outcome
               \Y (case opponent
                    \A \X
                    \B \Y
                    \C \Z)
               \X (case opponent
                    \A \Z
                    \B \X
                    \C \Y)
               \Z (case opponent
                    \A \Y
                    \B \Z
                    \C \X))]
    (format "%c %c" opponent move)))

(defn -main [& args]
  (let [data (util/get-input 2 "data")
        moves (.split data "\n")
        answer1 (reduce + (map result moves))
        answer2 (reduce + (map (comp result fix) moves))]
    (println [:part1 answer1 :part2 answer2])))


(advent-of-code.day2/-main)