cmake_minimum_required(VERSION 2.8.3)
project(homework)

find_package(catkin REQUIRED COMPONENTS
  roscpp
  rospy
  std_msgs
)

catkin_package()

include_directories(
  include ${catkin_INCLUDE_DIRS}
)

add_executable(guessingGame src/guessingGame.cpp)
target_link_libraries(guessingGame ${catkin_LIBRARIES})

