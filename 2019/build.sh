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

rm *.o