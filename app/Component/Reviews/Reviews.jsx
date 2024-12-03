import React from 'react';

const reviews = [
  {
    id: 1,
    name: 'Mohammad Al Ali',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    review: 'Great product! I loved the quality and the fast shipping. Will buy again.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Mustafa',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    review: 'The experience was excellent. I highly recommend this product.',
    rating: 4,
  },
  {
    id: 3,
    name: 'Ahmad Saleh',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    review: 'Wasn’t sure at first, but the product exceeded my expectations.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Najlaa Fahad',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    review: 'Customer service is great and delivery was fast, I’ll definitely shop again!',
    rating: 4,
  },
];

const ReviewsPage = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-yellow-400 min-h-70 p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Customer Reviews
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col items-center bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 max-w-xs w-full"
          >
            <img
              src={review.avatar}
              alt={review.name}
              className="w-16 h-16 rounded-full border-4 border-green-400 mb-4"
            />
            <div className="flex-1 text-center">
              <h2 className="text-xl font-semibold text-gray-800">{review.name}</h2>
              <p className="text-gray-600 mt-2 text-sm">{review.review}</p>
              <div className="flex mt-3 justify-center">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15l-5.366 3.163L5.818 12l-4.818-3.737L7.318 7.83l.732-5.167L10 5.5l1.95-2.797.732 5.167 5.318 3.433-4.818 3.737 1.184 6.163L10 15z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
