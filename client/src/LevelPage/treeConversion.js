export const conversion = {
    toCPP
};

const initialValue = `#include <iostream>
using namespace std;

int main()
{
    cout << "Hello, World!";
    return 0;
}`;

function toCPP(tree) {
    console.warn('The conversion to cpp is not implemented yet');
    return initialValue;
}