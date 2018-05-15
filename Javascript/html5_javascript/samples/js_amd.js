var module = (
    function () {

        function _privateMethod() {
            console.log("private method");
        }

        function publicMethod() {
            _privateMethod();
            console.log("public method");
        }

        return {
            myPublicMethod: publicMethod
        }

    }
)();

module.myPublicMethod();