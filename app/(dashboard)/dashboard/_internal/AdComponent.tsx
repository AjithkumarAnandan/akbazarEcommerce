import Image from 'next/image';

function AdComponent() {
  return (
    <div className='flex justify-end'><Image src={`/Frame.svg`} alt='No frame' width={1200} height={1200} className='font-auto'/></div>
  )
}

export default AdComponent