import React from "react";

const LoginPage = () => {
    return (
        <div className="container">
            <form action="" method="post">
                <h1>Login</h1>
                <div>
                    <input type="email" name="email" placeholder="Email" />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" />
                </div>
            </form>
        </div>
    );
};

export default LoginPage;