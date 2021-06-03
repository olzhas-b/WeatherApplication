// this C++ snippet is stored as openapi/py-newtonraphson.cpp
#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
#include <math.h>

struct MyWeather
{
  float x, y;
  MyWeather () {
    y = 0;
    x = 0;
  }

  MyWeather (float x, float y) : x(x), y(y) {}
  float getAvg()
  {
    return (x+y)/2;
  }
  float getKelvinMin(){
    return x + 273;
  }
  float getKelvinMax(){
    return y + 273;
  }
  float getCelciusMin(){
    return x - 273;
  }
  float getCelciusMax(){
    return y - 273;
  }
};

namespace py = pybind11;

PYBIND11_MODULE(myWeather, module) 
{
    module.doc () = "MyWeather";

    py::class_<MyWeather> (module, "MyWeather")
        .def (py::init<> ())
        .def (py::init<float, float> (), "constructor 2", py::arg ("x"), py::arg ("y"))
        .def ("getAvg", &MyWeather::getAvg)
        .def ("getKelvinMin", &MyWeather::getKelvinMin)
        .def ("getKelvinMax", &MyWeather::getKelvinMax)
        .def ("getCelciusMin", &MyWeather::getCelciusMin)
        .def ("getCelciusMax", &MyWeather::getCelciusMax)
    ;
}