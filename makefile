all:
	mkdir -p bin
	g++ -std=c++20 ./src/* -o ./bin/lpk
