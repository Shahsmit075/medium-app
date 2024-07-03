import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@100xdevs/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    });

    async function sendRequest() {
        try {   
            const response  = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup' ? "signup" : "signin"}`, postInputs);

            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
            }  
        catch (error) {
            alert("Error logging you in..")
            console.error(error);
        }  
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gray-900">
            <div className="w-full max-w-max p-8 bg-gray-800 rounded-lg shadow-lg">
                <div className="px-8">
                    <div className="text-3xl font-extrabold mb-4 text-center text-white">
                        {type === "signin" ? "Sign Into Your Account!" : "Create your free Account!"}
                    </div>
                    <div className="text-gray-400 text-center mb-8">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="pl-2 underline text-blue-400 hover:text-blue-600" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                <div className="pt-4 px-6">
                    {type === "signup" && (
                        <LabelledInput
                            label="Name"
                            placeholder="Smit Shah..."
                            onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    name: e.target.value,
                                });
                            }}
                        />
                    )}
                    <LabelledInput
                        label="Username"
                        placeholder="example@gmail.com"
                        onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                username: e.target.value,
                            });
                        }}
                    />
                    <LabelledInput
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value,
                            });
                        }}
                    />
                      <button onClick={sendRequest} type="button" className="mt-4 w-full text-white bg-gray-800 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-blue-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}
                      </button>
                </div>
            </div>
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-300 font-semibold">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
