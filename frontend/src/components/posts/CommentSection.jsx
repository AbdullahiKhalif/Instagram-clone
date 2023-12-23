import React from "react";

const CommentSection = ({ comments }) => {
  return (
    <div className="p-4">
      {comments?.map((comment) => (
        <>
          <div key={comment._id} className="mb-2 flex items-center space-x-3">
            <span className="">
              <img
                src={comment?.user.image ?? "./user.jpg"}
                alt="img"
                className="w-8 h-8 rounded-full"
              />
            </span>
            <span className="text-sm font-semibold text-gray-800">
              {comment?.user?.username + ":"}
            </span>{" "}
            {/* replace with actual comment author username */}
            <span className="ml-2 text-sm text-gray-800">
              {comment?.content}
            </span>
          </div>
        </>
      ))}
    </div>
  );
};

export default CommentSection;
