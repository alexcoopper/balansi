import React from 'react';

export const HealthIcon = ({ width = 24, height = 24, fill = 'white', ...props }) => (
    <svg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg' width={width} height={height} {...props}>
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            <path
                d='M18.5 9.00002H16.5M16.5 9.00002L14.5 9.00002M16.5 9.00002L16.5 7M16.5 9.00002L16.5 11'
                stroke={fill}
                strokeWidth='1.5'
                strokeLinecap='round'
            ></path>
            <path
                d='M8.96173 19.3786L9.43432 18.7963L8.96173 19.3786ZM12 5.57412L11.4522 6.08635C11.594 6.23803 11.7923 6.32412 12 6.32412C12.2077 6.32412 12.406 6.23803 12.5478 6.08635L12 5.57412ZM15.0383 19.3787L15.5109 19.961L15.0383 19.3787ZM12 21L12 20.25L12 21ZM2.65159 13.6821C2.86595 14.0366 3.32705 14.1501 3.68148 13.9358C4.03591 13.7214 4.14946 13.2603 3.9351 12.9059L2.65159 13.6821ZM6.53733 16.1707C6.24836 15.8739 5.77352 15.8676 5.47676 16.1566C5.18 16.4455 5.17369 16.9204 5.46267 17.2171L6.53733 16.1707ZM2.75 9.3175C2.75 6.41289 4.01766 4.61731 5.58602 4.00319C7.15092 3.39043 9.34039 3.82778 11.4522 6.08635L12.5478 5.06189C10.1598 2.50784 7.34924 1.70187 5.0391 2.60645C2.73242 3.50967 1.25 5.99209 1.25 9.3175H2.75ZM15.5109 19.961C17.0033 18.7499 18.7914 17.1268 20.2127 15.314C21.6196 13.5196 22.75 11.4354 22.75 9.31747H21.25C21.25 10.9289 20.3707 12.6814 19.0323 14.3884C17.7084 16.077 16.0156 17.6197 14.5657 18.7963L15.5109 19.961ZM22.75 9.31747C22.75 5.99208 21.2676 3.50966 18.9609 2.60645C16.6508 1.70187 13.8402 2.50784 11.4522 5.06189L12.5478 6.08635C14.6596 3.82778 16.8491 3.39042 18.414 4.00319C19.9823 4.6173 21.25 6.41287 21.25 9.31747H22.75ZM8.48914 19.961C9.76058 20.9928 10.6423 21.75 12 21.75L12 20.25C11.2771 20.25 10.8269 19.9263 9.43432 18.7963L8.48914 19.961ZM14.5657 18.7963C13.1731 19.9263 12.7229 20.25 12 20.25L12 21.75C13.3577 21.75 14.2394 20.9928 15.5109 19.961L14.5657 18.7963ZM3.9351 12.9059C3.18811 11.6708 2.75 10.455 2.75 9.3175H1.25C1.25 10.8297 1.82646 12.3179 2.65159 13.6821L3.9351 12.9059ZM9.43432 18.7963C8.51731 18.0521 7.49893 17.1582 6.53733 16.1707L5.46267 17.2171C6.47548 18.2572 7.53996 19.1908 8.48914 19.961L9.43432 18.7963Z'
                fill={fill}
            ></path>
        </g>
    </svg>
);

export const DefaultIcon = ({ width = 24, height = 24, fill = 'white', ...props }) => (
    <svg width='24px' height='24px' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='#ffffff'>
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            {' '}
            <path
                d='M12 12L24 24L12 36'
                stroke='#ffffff'
                stroke-width='4'
                stroke-linecap='round'
                stroke-linejoin='round'
            ></path>{' '}
            <path
                d='M24 12L36 24L24 36'
                stroke='#ffffff'
                stroke-width='4'
                stroke-linecap='round'
                stroke-linejoin='round'
            ></path>{' '}
        </g>
    </svg>
);

export const CarIcon = ({ width = 24, height = 24, fill = 'white', ...props }) => (
    <svg width='24px' height='24px' fill='white' viewBox='0 0 15 15' xmlns='http://www.w3.org/2000/svg' id='car-repair'>
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            {' '}
            <path d='M12.6,8.7,11.5,6.5a1.05,1.05,0,0,0-.9-.5H4.4a1.05,1.05,0,0,0-.9.5L2.4,8.7,1.16,9.852a.5.5,0,0,0-.16.367V14.5a.5.5,0,0,0,.5.5h2c.2,0,.5-.2.5-.4V14h7v.5c0,.2.2.5.4.5h2.1a.5.5,0,0,0,.5-.5V10.219a.5.5,0,0,0-.16-.367ZM4.5,7h6l1,2h-8ZM5,11.6c0,.2-.3.4-.5.4H2.4c-.2,0-.4-.3-.4-.5V10.4c.1-.3.3-.5.6-.4l2,.4c.2,0,.4.3.4.5Zm8-.1c0,.2-.2.5-.4.5H10.5c-.2,0-.5-.2-.5-.4v-.7c0-.2.2-.5.4-.5l2-.4c.3-.1.5.1.6.4ZM14,2V3a1.009,1.009,0,0,1-1.017,1H5.348A2.549,2.549,0,0,1,1,3.5H3.5v-2H1A2.549,2.549,0,0,1,5.348,1h7.635A1.009,1.009,0,0,1,14,2Z'></path>{' '}
        </g>
    </svg>
);

export const CasheIcon = ({ width = 24, height = 24, fill = 'white', ...props }) => (
    <svg width='24px' height='24px' fill='white' viewBox='0 0 96 96' xmlns='http://www.w3.org/2000/svg'>
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            {' '}
            <title></title>{' '}
            <g id='Money'>
                {' '}
                <path d='M48,64a8,8,0,1,0-8-8A8,8,0,0,0,48,64Zm0-15a7,7,0,1,1-7,7A7,7,0,0,1,48,49Z'></path>{' '}
                <path d='M19.5,65A3.5,3.5,0,0,1,23,68.5a.5.5,0,0,0,.5.5h49a.5.5,0,0,0,.5-.5A3.5,3.5,0,0,1,76.5,65a.5.5,0,0,0,.5-.5v-17a.5.5,0,0,0-.5-.5A3.5,3.5,0,0,1,73,43.5a.5.5,0,0,0-.5-.5h-49a.5.5,0,0,0-.5.5A3.5,3.5,0,0,1,19.5,47a.5.5,0,0,0-.5.5v17A.5.5,0,0,0,19.5,65ZM20,48a4.51,4.51,0,0,0,4-4H72a4.51,4.51,0,0,0,4,4V64a4.51,4.51,0,0,0-4,4H24a4.51,4.51,0,0,0-4-4Z'></path>{' '}
                <path d='M64,59a3,3,0,1,0-3-3A3,3,0,0,0,64,59Zm0-5a2,2,0,1,1-2,2A2,2,0,0,1,64,54Z'></path>{' '}
                <path d='M32,59a3,3,0,1,0-3-3A3,3,0,0,0,32,59Zm0-5a2,2,0,1,1-2,2A2,2,0,0,1,32,54Z'></path>{' '}
                <path d='M83.5,36h-71a.5.5,0,0,0-.5.5v39a.5.5,0,0,0,.5.5h71a.5.5,0,0,0,.5-.5v-39A.5.5,0,0,0,83.5,36ZM83,75H13V37H83Z'></path>{' '}
                <path d='M17.5,34a.5.5,0,0,0,.5-.5V29H78v4.5a.5.5,0,0,0,1,0v-5a.5.5,0,0,0-.5-.5h-61a.5.5,0,0,0-.5.5v5A.5.5,0,0,0,17.5,34Z'></path>{' '}
                <path d='M22.5,26a.5.5,0,0,0,.5-.5V21H73v4.5a.5.5,0,0,0,1,0v-5a.5.5,0,0,0-.5-.5h-51a.5.5,0,0,0-.5.5v5A.5.5,0,0,0,22.5,26Z'></path>{' '}
            </g>{' '}
        </g>
    </svg>
);

export const GroupIcon = ({ width = 24, height = 24, fill = 'white', ...props }) => (
    <svg width='24px' height='24px' fill='white' viewBox='0 0 1920 1920' xmlns='http://www.w3.org/2000/svg'>
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            {' '}
            <path
                d='M1807.059 1270.091c-68.668 48.452-188.725 116.556-343.906 158.57-18.861-102.55-92.725-187.37-196.066-219.106-91.708-28.235-185.11-48.339-279.53-61.666 71.944-60.762 121.638-145.807 135.982-243.162 21.91-.791 44.837-1.243 71.04-1.243 166.023.904 331.143 26.316 490.955 75.445 72.621 22.362 121.525 87.755 121.525 162.861v128.301Zm-451.765 338.824c-114.183 80.753-330.24 198.099-621.176 198.099-129.43 0-379.144-26.203-621.177-198.1v-128.752c0-74.993 49.017-140.499 121.75-162.861 162.41-49.694 330.354-74.88 499.427-74.88h8.47c166.588.79 331.821 26.09 491.407 75.106 72.509 22.249 121.3 87.642 121.3 162.635v128.753Zm-903.53-761.901V734.072c0-155.632 126.608-282.352 282.354-282.352 155.746 0 282.353 126.72 282.353 282.352v112.942c0 155.746-126.607 282.353-282.353 282.353S451.765 1002.76 451.765 847.014Zm734.118-734.118c75.22 0 146.146 29.478 199.567 82.899 53.309 53.421 82.786 124.235 82.786 199.454V508.19c0 155.746-126.607 282.353-282.353 282.353-19.651 0-38.4-2.598-56.47-6.438v-50.033c0-156.423-92.047-290.71-224.188-354.748 8.357-148.066 130.447-266.428 280.658-266.428Zm532.857 758.061c-91.37-28.01-184.546-48.226-279.755-61.666 86.174-72.508 142.192-179.802 142.192-301.1V395.248c0-105.374-41.11-204.65-115.877-279.304-74.767-74.767-173.93-115.99-279.417-115.99-200.696 0-365.138 151.002-390.211 345.148-20.217-3.275-40.433-6.325-61.553-6.325-217.977 0-395.294 177.43-395.294 395.294v112.942c0 121.298 56.018 228.593 142.305 301.214-94.305 13.214-188.16 33.092-279.529 61.1C81.092 1246.375 0 1355.249 0 1480.163v185.675l22.588 16.941c275.238 206.344 563.803 237.177 711.53 237.177 344.244 0 593.618-148.63 711.53-237.177l22.587-16.94v-120.51c205.214-50.597 355.652-146.032 429.177-201.373l22.588-16.941V1141.79c0-125.026-80.979-233.901-201.261-270.833Z'
                fill-rule='evenodd'
            ></path>{' '}
        </g>
    </svg>
);

export const HomeIcon = ({ width = 24, height = 24, fill = 'white', ...props }) => (
    <svg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            {' '}
            <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M4.18753 11.3788C4.03002 11.759 4 11.9533 4 12V20.0018C4 20.5529 4.44652 21 5 21H8V15C8 13.8954 8.89543 13 10 13H14C15.1046 13 16 13.8954 16 15V21H19C19.5535 21 20 20.5529 20 20.0018V12C20 11.9533 19.97 11.759 19.8125 11.3788C19.6662 11.0256 19.4443 10.5926 19.1547 10.1025C18.5764 9.1238 17.765 7.97999 16.8568 6.89018C15.9465 5.79788 14.9639 4.78969 14.0502 4.06454C13.5935 3.70204 13.1736 3.42608 12.8055 3.2444C12.429 3.05862 12.1641 3 12 3C11.8359 3 11.571 3.05862 11.1945 3.2444C10.8264 3.42608 10.4065 3.70204 9.94978 4.06454C9.03609 4.78969 8.05348 5.79788 7.14322 6.89018C6.23505 7.97999 5.42361 9.1238 4.8453 10.1025C4.55568 10.5926 4.33385 11.0256 4.18753 11.3788ZM10.3094 1.45091C10.8353 1.19138 11.4141 1 12 1C12.5859 1 13.1647 1.19138 13.6906 1.45091C14.2248 1.71454 14.7659 2.07921 15.2935 2.49796C16.3486 3.33531 17.4285 4.45212 18.3932 5.60982C19.3601 6.77001 20.2361 8.0012 20.8766 9.08502C21.1963 9.62614 21.4667 10.1462 21.6602 10.6134C21.8425 11.0535 22 11.5467 22 12V20.0018C22 21.6599 20.6557 23 19 23H16C14.8954 23 14 22.1046 14 21V15H10V21C10 22.1046 9.10457 23 8 23H5C3.34434 23 2 21.6599 2 20.0018V12C2 11.5467 2.15748 11.0535 2.33982 10.6134C2.53334 10.1462 2.80369 9.62614 3.12345 9.08502C3.76389 8.0012 4.63995 6.77001 5.60678 5.60982C6.57152 4.45212 7.65141 3.33531 8.70647 2.49796C9.2341 2.07921 9.77521 1.71454 10.3094 1.45091Z'
                fill='white'
            ></path>{' '}
        </g>
    </svg>
);

export const CommunicationIcon = ({ width = 24, height = 24, fill = 'white', ...props }) => (
    <svg width='24px' height='24px' viewBox='0 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' fill='white'>
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            {' '}
            <g
                id='Free-Icons'
                stroke='none'
                stroke-width='1'
                fill='none'
                fill-rule='evenodd'
                stroke-linecap='round'
                stroke-linejoin='round'
            >
                {' '}
                <g transform='translate(-747.000000, -230.000000)' id='Group' stroke='white' stroke-width='2'>
                    {' '}
                    <g transform='translate(745.000000, 228.000000)' id='Shape'>
                        {' '}
                        <path d='M3.37340954,3.66347908 C3.40787577,3.485069 3.55974508,3.35151448 3.74396838,3.33760804 L8.19635574,3.001528 C8.62929163,2.96884703 9.01278554,3.27428723 9.06997279,3.69733504 L9.59948509,7.6144501 C9.63302728,7.86258149 9.54708212,8.11191268 9.36699693,8.28890987 L7.62453427,10.0014938 C7.30504828,10.3155014 7.30504828,10.8246083 7.62453427,11.138616 L13.0351592,16.4564625 C13.3546452,16.7704701 13.8726343,16.7704701 14.1921203,16.4564625 L15.9577477,14.7211111 C16.1245838,14.5571357 16.3553266,14.4719396 16.5907441,14.4873926 L20.2372001,14.7267491 C20.6701106,14.7551657 21.0051574,15.1108082 21.00078,15.5372211 L20.9519068,20.2472963 C20.9499162,20.4393056 20.8100517,20.6031281 20.6180058,20.6383953 C15.8264987,21.51825 10.6764947,20.9404181 6.87186521,17.2010282 C3.06133612,13.4558399 2.46314132,8.37536644 3.37340954,3.66347908 Z'>
                            {' '}
                        </path>{' '}
                    </g>{' '}
                </g>{' '}
            </g>{' '}
        </g>
    </svg>
);

export const CafeIcon = ({ width = 24, height = 24, fill = 'white', ...props }) => (
    <svg
        fill='#ffffff'
        width='24px'
        height='24px'
        viewBox='0 0 1024 1024'
        xmlns='http://www.w3.org/2000/svg'
        stroke='#ffffff'
    >
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            <path d='M962.26 331.227c0-35.404-28.433-64.041-63.437-64.041s-63.437 28.636-63.437 64.041c0 35.404 28.433 64.041 63.437 64.041s63.437-28.636 63.437-64.041zm40.96 0c0 57.961-46.705 105.001-104.397 105.001s-104.397-47.04-104.397-105.001c0-57.961 46.705-105.001 104.397-105.001s104.397 47.04 104.397 105.001z'></path>
            <path d='M791.244 283.667c0-49.716-124.664-99.348-280.494-99.348-155.822 0-280.484 49.633-280.484 99.348s124.662 99.348 280.484 99.348c155.831 0 280.494-49.633 280.494-99.348zm40.96 0c0 82.646-144.832 140.308-321.454 140.308-176.614 0-321.444-57.663-321.444-140.308s144.83-140.308 321.444-140.308c176.622 0 321.454 57.662 321.454 140.308z'></path>
            <path d='M792.404 283.129v84.705c0 156.652-127.623 283.679-285.102 283.679-152.954 0-276.91-123.372-276.91-275.517v-92.867h-40.96v92.867c0 174.81 142.338 316.477 317.87 316.477 180.058 0 326.062-145.322 326.062-324.639v-84.705h-40.96z'></path>
            <path d='M863.042 554.415c77.863 32.638 119.994 73.652 119.994 112.829 0 89.94-210.031 172.329-471.04 172.329-261.002 0-471.04-82.391-471.04-172.329 0-39.683 43.249-81.235 122.886-114.029 10.459-4.307 15.446-16.277 11.139-26.736s-16.277-15.446-26.736-11.139C54.933 553.766-.004 606.548-.004 667.244c0 123.031 230.093 213.289 512 213.289 281.914 0 512-90.256 512-213.289 0-60.011-53.696-112.282-145.119-150.605-10.431-4.373-22.432.539-26.805 10.97s.539 22.432 10.97 26.805z'></path>
        </g>
    </svg>
);

export const ClothingIcon = ({ width = 24, height = 24, fill = 'white', ...props }) => (
    <svg
        width='24px'
        height='24px'
        fill='#ffffff'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        stroke='#ffffff'
    >
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            {' '}
            <title></title>{' '}
            <g data-name='Layer 2' id='Layer_2'>
                {' '}
                <path d='M12,5.59,8.16,1.74,2,5.43V12H5V22H19V12h3V5.43L15.84,1.74Zm8,1V10H17V20H7V10H4V6.57L7.84,4.26,12,8.41l4.16-4.16Z'></path>{' '}
                <rect height='2' width='3' x='13' y='10'></rect>{' '}
            </g>{' '}
        </g>
    </svg>
);

export const MoneyTransferIcon = ({ width = 24, height = 24, fill = 'white', ...props }) => (
    <svg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='#ffffff'>
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            {' '}
            <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M9.94358 3.25H14.0564C15.8942 3.24998 17.3498 3.24997 18.489 3.40314C19.6614 3.56076 20.6104 3.89288 21.3588 4.64124C22.0368 5.31932 22.374 6.16313 22.5484 7.19112C22.6758 7.94158 22.7222 8.82957 22.7395 9.87437C22.7464 9.91522 22.75 9.95719 22.75 10C22.75 10.0353 22.7476 10.07 22.7428 10.104C22.7464 10.3904 22.7482 10.6882 22.7491 10.9978C22.7503 11.412 22.4155 11.7488 22.0013 11.75C21.5871 11.7512 21.2503 11.4164 21.2491 11.0022C21.2488 10.9168 21.2485 10.8328 21.2481 10.75H2.75199C2.75009 11.1384 2.75 11.5541 2.75 12C2.75 13.9068 2.75159 15.2615 2.88976 16.2892C3.02502 17.2952 3.27869 17.8749 3.7019 18.2981C4.12511 18.7213 4.70476 18.975 5.71085 19.1102C6.73851 19.2484 8.09318 19.25 10 19.25H11.5C11.9142 19.25 12.25 19.5858 12.25 20C12.25 20.4142 11.9142 20.75 11.5 20.75H9.94359C8.10583 20.75 6.65019 20.75 5.51098 20.5969C4.33856 20.4392 3.38961 20.1071 2.64124 19.3588C1.89288 18.6104 1.56076 17.6614 1.40314 16.489C1.24997 15.3498 1.24998 13.8942 1.25 12.0564V11.9436C1.24999 11.2818 1.24999 10.6696 1.25714 10.1039C1.25243 10.0699 1.25 10.0352 1.25 10C1.25 9.95716 1.25359 9.91517 1.26049 9.87429C1.27564 8.96711 1.31267 8.18385 1.40314 7.51098C1.56076 6.33856 1.89288 5.38961 2.64124 4.64124C3.38961 3.89288 4.33856 3.56076 5.51098 3.40314C6.65019 3.24997 8.10582 3.24998 9.94358 3.25ZM2.77607 9.25H21.2238C21.1999 8.53519 21.1547 7.9438 21.0696 7.44205C20.9267 6.60017 20.6831 6.08692 20.2981 5.7019C19.8749 5.27869 19.2952 5.02502 18.2892 4.88976C17.2615 4.75159 15.9068 4.75 14 4.75H10C8.09318 4.75 6.73851 4.75159 5.71085 4.88976C4.70476 5.02502 4.12511 5.27869 3.7019 5.7019C3.27869 6.12511 3.02502 6.70476 2.88976 7.71085C2.82987 8.15634 2.79564 8.66327 2.77607 9.25ZM15.5 13.25C15.9142 13.25 16.25 13.5858 16.25 14V18.1893L16.9697 17.4697C17.2626 17.1768 17.7374 17.1768 18.0303 17.4697C18.3232 17.7626 18.3232 18.2374 18.0303 18.5303L16.0303 20.5303C15.7374 20.8232 15.2626 20.8232 14.9697 20.5303L12.9697 18.5303C12.6768 18.2374 12.6768 17.7626 12.9697 17.4697C13.2626 17.1768 13.7374 17.1768 14.0303 17.4697L14.75 18.1893V14C14.75 13.5858 15.0858 13.25 15.5 13.25ZM19.4697 13.4697C19.7626 13.1768 20.2374 13.1768 20.5303 13.4697L22.5303 15.4697C22.8232 15.7626 22.8232 16.2374 22.5303 16.5303C22.2374 16.8232 21.7626 16.8232 21.4697 16.5303L20.75 15.8107V20C20.75 20.4142 20.4142 20.75 20 20.75C19.5858 20.75 19.25 20.4142 19.25 20V15.8107L18.5303 16.5303C18.2374 16.8232 17.7626 16.8232 17.4697 16.5303C17.1768 16.2374 17.1768 15.7626 17.4697 15.4697L19.4697 13.4697ZM5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H10C10.4142 15.25 10.75 15.5858 10.75 16C10.75 16.4142 10.4142 16.75 10 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16Z'
                fill='white'
            ></path>{' '}
        </g>
    </svg>
);

export const ServicesIcon = ({ width = 24, height = 24, fill = 'white', ...props }) => (
    <svg
        version='1.1'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 32 32'
        enable-background='new 0 0 32 32'
        fill='#ffffff'
        stroke='#ffffff'
        width='24px'
        height='24px'
    >
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            {' '}
            <circle
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                cx='11.9'
                cy='20.1'
                r='5.8'
            ></circle>{' '}
            <line
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                x1='3.9'
                y1='23.4'
                x2='6.6'
                y2='22.3'
            ></line>{' '}
            <line
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                x1='17.2'
                y1='17.9'
                x2='19.9'
                y2='16.8'
            ></line>{' '}
            <line
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                x1='8.6'
                y1='12.1'
                x2='9.7'
                y2='14.8'
            ></line>{' '}
            <line
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                x1='14.1'
                y1='25.4'
                x2='15.2'
                y2='28.1'
            ></line>{' '}
            <line
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                x1='3.9'
                y1='16.8'
                x2='6.6'
                y2='17.9'
            ></line>{' '}
            <line
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                x1='17.2'
                y1='22.3'
                x2='19.9'
                y2='23.4'
            ></line>{' '}
            <line
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                x1='15.2'
                y1='12.1'
                x2='14.1'
                y2='14.8'
            ></line>{' '}
            <line
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                x1='9.7'
                y1='25.4'
                x2='8.6'
                y2='28.1'
            ></line>{' '}
            <circle
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                cx='22.5'
                cy='9.5'
                r='4.7'
            ></circle>{' '}
            <line
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                x1='17.5'
                y1='14.5'
                x2='19.2'
                y2='12.8'
            ></line>{' '}
            <line
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                x1='25.8'
                y1='6.2'
                x2='27.4'
                y2='4.6'
            ></line>{' '}
            <line
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                x1='17.5'
                y1='4.6'
                x2='19.2'
                y2='6.2'
            ></line>{' '}
            <line
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                x1='25.8'
                y1='12.8'
                x2='27.4'
                y2='14.5'
            ></line>{' '}
            <line
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                x1='15.5'
                y1='9.5'
                x2='17.8'
                y2='9.5'
            ></line>{' '}
            <line
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                x1='27.2'
                y1='9.5'
                x2='29.5'
                y2='9.5'
            ></line>{' '}
            <line
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                x1='22.5'
                y1='2.5'
                x2='22.5'
                y2='4.8'
            ></line>{' '}
            <line
                fill='none'
                stroke='#ffffff'
                stroke-width='2'
                stroke-miterlimit='10'
                x1='22.5'
                y1='14.2'
                x2='22.5'
                y2='16.5'
            ></line>{' '}
        </g>
    </svg>
);

export const FoodIcon = ({ width = 24, height = 24, fill = 'white', ...props }) => (
    <svg
        width='24px'
        height='24px'
        fill='#ffffff'
        version='1.1'
        id='Capa_1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 196.095 196.095'
        stroke='#ffffff'
    >
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            {' '}
            <g>
                {' '}
                <path d='M155.158,78.066l-24.134-48.271c2.441-2.633,3.966-6.127,3.966-9.986c0-8.124-6.572-14.697-14.682-14.697 c-8.122,0-14.694,6.573-14.694,14.697c0,7.938,6.312,14.369,14.186,14.635l21.822,43.622H54.488l21.814-43.622 c7.873-0.266,14.191-6.696,14.191-14.635c0-8.124-6.579-14.697-14.694-14.697c-8.112,0-14.697,6.573-14.697,14.697 c0,3.872,1.537,7.365,3.984,9.986l-24.14,48.271H0l42.489,112.916h111.108l42.498-112.916H155.158z M78.087,147.408v-25.771h39.939 v25.771H78.087z M118.026,159.514v19.363H78.087v-19.363H118.026z M39.064,147.491l-9.72-25.849h36.644v25.777H39.076 L39.064,147.491L39.064,147.491z M78.087,109.532V90.171h39.939v19.361H78.087z M130.131,121.637h36.635l-9.711,25.843v-0.071 h-26.9v-25.771H130.131z M130.131,109.532V90.171h48.479l-7.281,19.361H130.131z M65.982,90.171v19.361H24.781l-7.282-19.361 H65.982z M43.586,159.514h22.39v19.363H50.874L43.586,159.514z M130.131,178.877v-19.363h22.39l-7.294,19.363H130.131z'></path>{' '}
            </g>{' '}
        </g>
    </svg>
);

export const TvIcon = ({ width = 24, height = 24, fill = 'white', ...props }) => (
    <svg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            {' '}
            <path
                d='M15 7V21M18 11H18.01M18 14H18.01M18 17H18.01M17 3L12 7L7 3M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V11.8C21 10.1198 21 9.27976 20.673 8.63803C20.3854 8.07354 19.9265 7.6146 19.362 7.32698C18.7202 7 17.8802 7 16.2 7H7.8C6.11984 7 5.27976 7 4.63803 7.32698C4.07354 7.6146 3.6146 8.07354 3.32698 8.63803C3 9.27976 3 10.1198 3 11.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z'
                stroke='#ffffff'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
            ></path>{' '}
        </g>
    </svg>
);

export const HouseholdIcon = ({ width = 24, height = 24, fill = 'white', ...props }) => (
    <svg
        width='24px'
        height='24px'
        fill='#ffffff'
        viewBox='0 0 256 256'
        id='Flat'
        xmlns='http://www.w3.org/2000/svg'
        stroke='#ffffff'
    >
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            {' '}
            <path d='M227.79883,28.20117a28.03349,28.03349,0,0,0-39.59766,0c-.05078.05078-.10058.10254-.14844.15625L133.15039,89.53125a4.00026,4.00026,0,0,1-5.80566.15723l-9.20313-9.20313a20.01985,20.01985,0,0,0-28.2832,0L13.17188,157.17188a3.99853,3.99853,0,0,0,0,5.65624l80,80a3.99852,3.99852,0,0,0,5.65624,0l76.68653-76.68652a20.02163,20.02163,0,0,0,0-28.2832l-9.20313-9.20313a4.00026,4.00026,0,0,1,.15723-5.80566l61.17383-54.90234c.05371-.04786.10547-.09766.15625-.14844A28.03171,28.03171,0,0,0,227.79883,28.20117ZM96,234.34277,76.22119,214.564,104.584,186.20215a3.99957,3.99957,0,0,0-5.65625-5.65625L70.56494,208.90771,48.22119,186.564,76.584,158.20215a3.99957,3.99957,0,0,0-5.65625-5.65625L42.56494,180.90771,21.65723,160,72,109.65625,146.34375,184ZM222.21484,62.06934,161.125,116.89648a11.99854,11.99854,0,0,0-.46973,17.415l9.20313,9.20313a12.00033,12.00033,0,0,1,0,16.9707L152,178.34375,77.65625,104l17.8584-17.8584a12.00033,12.00033,0,0,1,16.9707,0l9.20313,9.20313a11.99854,11.99854,0,0,0,17.415-.46973l54.82714-61.08984a20.0002,20.0002,0,0,1,28.28418,28.28418Z'></path>{' '}
        </g>
    </svg>
);

export const SchoolIcon = ({ width = 24, height = 24, fill = 'white', ...props }) => (
    <svg
        fill='#ffffff'
        width='24px'
        height='24px'
        version='1.1'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 500.462 500.462'
        stroke='#ffffff'
    >
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            {' '}
            <g>
                {' '}
                <g>
                    {' '}
                    <path d='M371.261,237.88l98.662-98.659l1.875-110.553l-110.548,1.87L262.585,129.2L133.385,0L0,133.389l129.196,129.196 l-77.859,77.857c-14.51,14.514-22.5,33.813-22.5,54.337s7.99,39.822,22.5,54.337c14.519,14.514,33.817,22.51,54.346,22.51 c20.519,0,39.817-7.995,54.337-22.51l77.852-77.85l129.206,129.196l133.385-133.385L371.261,237.88z M369.538,50.096l82.221-1.389 l-1.394,82.216l-24.531,24.531l-80.825-80.829L369.538,50.096z M111.968,217.511l46.013-46.016l-13.923-13.923l-46.013,46.016 l-23.812-23.812l46.017-46.017l-13.923-13.923L60.31,165.853l-32.464-32.464L133.385,27.846l115.277,115.277L143.119,248.662 L111.968,217.511z M331.086,88.547l33.451,33.454L136.673,349.861l-33.454-33.454L331.086,88.547z M146.096,435.192 c-10.798,10.793-25.154,16.74-40.414,16.74c-15.269,0-29.625-5.947-40.423-16.74c-10.789-10.793-16.731-25.144-16.731-40.413 s5.942-29.62,16.731-40.413l24.037-24.035l80.831,80.831L146.096,435.192z M184.05,397.238l-33.454-33.454L378.46,135.924 l33.451,33.453L184.05,397.238z M334.53,440.072l46.018-46.014l-13.923-13.923l-46.019,46.014l-23.81-23.808l46.011-46.019 l-13.923-13.923l-46.011,46.019l-31.078-31.076l105.542-105.539l115.278,115.273L367.077,472.615L334.53,440.072z'></path>{' '}
                </g>{' '}
            </g>{' '}
        </g>
    </svg>
);

export const RozetkaIcon = ({ width = 24, height = 24, fill = 'white', ...props }) => (
    <svg width='24px' height='24px' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg' fill='#000000'>
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            {' '}
            <defs> </defs>{' '}
            <g id='a'>
                {' '}
                <g>
                    {' '}
                    <path d='m15.8871,36.0589V11.85h8.1129c4.4806,0,8.1129,3.6401,8.1129,8.1304s-3.6323,8.1304-8.1129,8.1304h-8.1129'></path>{' '}
                    <line x1='24' y1='28.1107' x2='32.0219' y2='36.15'></line>{' '}
                </g>{' '}
            </g>{' '}
            <g id='b'>
                {' '}
                <circle cx='24' cy='24' r='21.5'></circle>{' '}
            </g>{' '}
        </g>
    </svg>
);

export const LockIcon = ({ width = 40, height = 40, fill = '#000000', ...props }) => (
    <svg
        fill={fill}
        height={height + 'px'}
        width={width + 'px'}
        version='1.1'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 330 330'
    >
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            {' '}
            <g id='XMLID_504_'>
                {' '}
                <path
                    id='XMLID_505_'
                    d='M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M207.481,219.356l-42.5,42.5 c-2.929,2.929-6.768,4.394-10.606,4.394s-7.678-1.465-10.606-4.394l-21.25-21.25c-5.858-5.858-5.858-15.354,0-21.213 c5.857-5.858,15.355-5.858,21.213,0l10.644,10.643l31.894-31.893c5.857-5.858,15.355-5.858,21.213,0 C213.34,204.002,213.34,213.498,207.481,219.356z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z'
                ></path>{' '}
            </g>{' '}
        </g>
    </svg>
);

export const UnLockIcon = ({ width = 40, height = 40, fill = 'white', ...props }) => (
    <svg
        fill='#000000'
        height={height + 'px'}
        width={width + 'px'}
        version='1.1'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 330 330'
    >
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            {' '}
            <g id='XMLID_516_'>
                {' '}
                <path
                    id='XMLID_517_'
                    d='M15,160c8.284,0,15-6.716,15-15V85c0-30.327,24.673-55,55-55c30.327,0,55,24.673,55,55v45h-25 c-8.284,0-15,6.716-15,15v170c0,8.284,6.716,15,15,15h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15H170V85 c0-46.869-38.131-85-85-85S0,38.131,0,85v60C0,153.284,6.716,160,15,160z'
                ></path>{' '}
            </g>{' '}
        </g>
    </svg>
);
