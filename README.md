In order to build you will need to manually edit some podspec files from within node modules.

RNCharts.podspec
lottie-react-native.podspec

In these podfiles change the s.platforms to "s.platforms = { :ios => "8.0", :tvos => "9.2" }"

builds from commandline with Xcode 11.2 CLI tools
