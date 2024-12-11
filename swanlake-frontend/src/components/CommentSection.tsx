import React, { useState } from 'react';
import { User, ThumbsUp, ThumbsDown, Reply } from 'lucide-react';
import ReactStars from 'react-stars';

interface Comment {
    id: number;
    user: string;
    avatar: string;
    rating: number;
    content: string;
    likes: number;
    dislikes: number;
    date: string;
    replies?: Comment[];
}

const comments: Comment[] = [
    {
        id: 1,
        user: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
        rating: 4,
        content: "The camera improvements are incredible! Night mode photos are especially impressive.",
        likes: 24,
        dislikes: 2,
        date: "2 days ago",
        replies: [
            {
                id: 2,
                user: "Jane Smith",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
                rating: 5,
                content: "Totally agree! The macro shots are amazing too.",
                likes: 8,
                dislikes: 0,
                date: "1 day ago"
            }
        ]
    }
];

export default function CommentSection() {
    const [newComment, setNewComment] = useState("");

    const CommentCard = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
        <div className={`${isReply ? 'ml-12' : ''} mb-6`}>
            <div className="flex gap-4">
                <img
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold dark:text-white">{comment.user}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{comment.date}</span>
                    </div>
                    <ReactStars
                        count={5}
                        value={comment.rating}
                        size={16}
                        color2="#FDB241"
                        edit={false}
                    />
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{comment.content}</p>

                    <div className="flex items-center gap-6 mt-3">
                        <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{comment.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                            <ThumbsDown className="w-4 h-4" />
                            <span>{comment.dislikes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                            <Reply className="w-4 h-4" />
                            <span>Reply</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold dark:text-white mb-6">Comments (128)</h2>

            <div className="mb-8">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="flex-1">
                        <ReactStars
                            count={5}
                            value={0}
                            size={24}
                            color2="#FDB241"
                        />
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment..."
                            className="mt-2 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                            rows={3}
                        />
                        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Post Comment
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {comments.map(comment => (
                    <div key={comment.id}>
                        <CommentCard comment={comment} />
                        {comment.replies?.map(reply => (
                            <CommentCard key={reply.id} comment={reply} isReply />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}