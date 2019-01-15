#include "ros/ros.h"
#include "std_msgs/Int32.h"
#include "std_msgs/String.h"
#include "std_msgs/Bool.h"

#include <iostream>
#include <random>
#include <ctime>
#include <boost/bind.hpp>

int ans = 0;

void reset() {
    ans = rand() % 101;
    ROS_INFO("Set: %d", ans);
}

void reset_callback(const std_msgs::Int32 t) {
    reset();
}

void callback(const std_msgs::Int32::ConstPtr t, ros::Publisher &pub) {
    int32_t guess;

    guess = t -> data;

    std_msgs::String hint;

    if (guess == ans) {
        hint.data = "Correct";
    }

    if (guess < ans) {
        hint.data = "Too Small";
    }

    if (guess > ans) {
        hint.data = "Too Big";
    }

    pub.publish(hint);
}

int main(int argc, char **argv) {

    ros::init(argc, argv, "guessingGame");

    srand((unsigned int)time(NULL));
    reset();

    ros::NodeHandle n;

    ros::Publisher pub = n.advertise<std_msgs::String>("hint", 1000);
    ros::Subscriber sub = n.subscribe<std_msgs::Int32>("guess", 1000, boost::bind(callback, _1, pub));
    ros::Subscriber reset = n.subscribe<std_msgs::Int32>("reset", 1000, reset_callback);

    ros::spin();

    return 0;
}
