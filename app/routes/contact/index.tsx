import type { Route } from './+types/index';
// import { Form } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Karam-is-a-dev | Contact Me' },
    { name: 'description', content: 'Welcome to Karam-is-a-dev!' },
  ];
}
// export async function action({ request }: Route.ActionArgs) {
//   const formData = await request.formData();
//   const name1 = formData.get('name') as string;
//   const email1 = formData.get('email') as string;
//   const subject1 = formData.get('subject') as string;
//   const textArea1 = formData.get('textArea') as string;

//   const errors: Record<string, string> = {};

//   const data = {
//     name1,
//     email1,
//     subject1,
//     textArea1,
//   };
//   if (!name1) errors.name = 'Name is required';
//   if (!email1) {
//     errors.email = 'Email is required';
//   } else if (!email1.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email1.trim())) {
//     errors.email = 'Invalid email format';
//   }
//   // if (!subject1) errors.subject= 'Subject is required';
//   if (!textArea1) errors.textArea = 'Message is required';

//   if (Object.keys(errors).length > 0) {
//     return { errors };
//   }

//   //database saving logic can be added here
//   //ex prisma : contactForm.create({data:data})

//   console.log('Contact Form Data:', data);
//   return { message: 'Form submitted successfully!', data };
// }

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  // const errorrs = actionData?.errors || {};
  return (
    <div className='max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900'>
      <h2 className='text-3xl font-bold text-center mb-8'>🔭 Contact Me</h2>
      {/* {actionData?.message && (
        <div className='mb-6 mx-auto text-center px-3 py-3 border border-green-900 bg-green-600 text-white rounded'>
          {actionData.message}
        </div>
      )} */}
      <form action="https://formspree.io/f/xgowgawq" method="post" className='space-y-6'>
        <div>
          <label
            htmlFor='name'
            className='block text-lg font-medium text-gray-300'>
            Full Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
          {/* {errorrs.name && (
            <p className='text-red-500 text-sm mt-1'>{errorrs.name}</p>
          )} */}
        </div>
        <div>
          <label
            htmlFor='email'
            className='block text-lg font-medium text-gray-300'>
            Email
          </label>
          <input
            type='text'
            id='email'
            name='email'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
          {/* {errorrs.email && (
            <p className='text-red-500 text-sm mt-1'>{errorrs.email}</p>
          )} */}
        </div>
        <div>
          <label
            htmlFor='subject'
            className='block text-lg font-medium text-gray-300'>
            Subject
          </label>
          <input
            type='text'
            id='subject'
            name='subject'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
        </div>
        <div>
          <label
            htmlFor='textArea'
            className='block text-lg font-medium text-gray-300'>
            Message
          </label>
          <textarea
            id='textArea'
            name='textArea'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
          {/* {errorrs.textArea && (
            <p className='text-red-500 text-sm mt-1'>{errorrs.textArea}</p>
          )} */}
        </div>
        <button className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg'>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
