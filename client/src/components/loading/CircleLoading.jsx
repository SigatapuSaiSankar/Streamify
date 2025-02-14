import React from 'react';

const CircleLoading = (props) => {
    return (
        // <div className="gap-4 top-20 left-35 scale-150 flex items-center pr-5 rounded-sm bg-green-100">
        <div>
            <div className="scale-60 w-1 h-1 border-6 border-transparent text-green-400 text-4xl animate-spin flex items-center justify-center border-t-green-400 rounded-full">
                <div className="w-2 h-2 border-6 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
            </div>
        </div>
    );
}

export default CircleLoading;


// import React from 'react';

// const CircleLoading = () => {
//     return (
//         <div className=" gap-4 flex items-center justify-center">
//             <div className="w-10 h-10 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
//                 <div className="w-9 h-9 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
//             </div>
//             <p className="text-lg font-semibold text-gray-600">Loading...</p>
//         </div>
//     );
// }

// export default CircleLoading;
