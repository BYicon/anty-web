// Add this declaration at the top of your file or in a separate type declaration file
import ''; // 再没有引入任何模块的文件中，TS不会识别该文件作为一个模块，所以需要引入一个空模块
declare global {
    interface Window {
        ethereum?: any;
    }
}