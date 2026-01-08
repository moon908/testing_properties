import React, { useState } from 'react'
import { AlertCircle, X, CheckCircle2 } from 'lucide-react'

const Alert = () => {
    const [isOpen, setIsOpen] = useState(false)

    const triggerAlert = () => {
        setIsOpen(true)
    }

    const closeAlert = () => {
        setIsOpen(false)
    }

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <button
                className='
                    px-6 py-3 rounded-full 
                    bg-linear-to-r from-violet-600 to-indigo-600 
                    text-white font-semibold shadow-lg 
                    hover:shadow-indigo-500/50 hover:scale-105 
                    transition-all duration-300 ease-in-out
                '
                onClick={triggerAlert}
            >
                Trigger Stylish Alert
            </button>

            {/* Custom Alert Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
                        onClick={closeAlert}
                    ></div>

                    {/* Alert Content */}
                    <div className="
                        relative z-10 w-full max-w-sm m-4 overflow-hidden 
                        bg-white/90 dark:bg-zinc-900/90 
                        backdrop-blur-xl border border-white/20 dark:border-zinc-800
                        rounded-2xl shadow-2xl 
                        animate-fadeInUp
                    ">

                        {/* Decorative background blob */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="p-6 flex flex-col items-center text-center">
                            <div className="mb-4 p-3 bg-linear-to-br from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30 rounded-full shadow-inner">
                                <AlertCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                            </div>

                            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 mb-2">
                                Attention Needed
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                                This is a much more stylish way to show alerts to your users. It grabs attention without being annoying.
                            </p>

                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={closeAlert}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                >
                                    Dismiss
                                </button>
                                <button
                                    onClick={closeAlert}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
                                >
                                    Understood
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={closeAlert}
                            className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Alert