#!/bin/bash

# I'll learn makefile later

g++ -c *.cpp utils/*.cpp
g++ input.o day1.o -o build/day1
g++ input.o day2.o -o build/day2
g++ input.o day3.o -o build/day3
g++ input.o day4.o -o build/day4
g++ intcode.o input.o day5.o -o build/day5
g++ input.o day6.o -o build/day6
g++ intcode.o input.o day7.o -o build/day7
g++ input.o day8.o -o build/day8
g++ intcode.o input.o day9.o -o build/day9
g++ input.o day10.o -o build/day10
g++ intcode.o input.o day11.o -o build/day11
g++ input.o day12.o -o build/day12
rm day*.o