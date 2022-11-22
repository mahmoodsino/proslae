import React from 'react'
import { motion } from 'framer-motion';

import {
	LOGIN_COMPONENT,
	REGISTER_STEP1_COMPONENT,
	REGISTER_STEP2_COMPONENT,
	FORGET_PASSWORD,
} from "../../../../helpers/Common"
import { useRecoilState } from 'recoil';
import LogRegisterAtom from '../../../../helpers/recoil/log-register/LogRegisterAtom';
import MainComponent from './MainComponent';
import LoginComponent from './LoginComponent';
import RegisterStep1 from './RegisterStep1';


const variants = {
	hidden: {
		y: 0,
		opacity: 0,
		transition: { duration: 0.4 },
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.4 },
	},
};

const MainSecion = () => {
    const [logORregister,setLogORregister]=useRecoilState(LogRegisterAtom)

    const renderComponent = () => {
		switch (logORregister) {
			case LOGIN_COMPONENT: {
				return <LoginComponent />;
			}
			case REGISTER_STEP1_COMPONENT: {
				return <RegisterStep1 />;
			}
			case REGISTER_STEP2_COMPONENT: {
				return <RegisterStep1 />;
			}
			case FORGET_PASSWORD: {
				// return <ForgetPassword />;
			}
			default: {
				return (
					<motion.div variants={variants} initial="hidden" animate="visible">
						<MainComponent />
					</motion.div>
				);
			}
		}
	};
  return (
    <div>
			<div className="x-box-parent">
				<div className="x-box">
					<div className="left">{renderComponent()}</div>

					<div className="right">
						<img src="main.jpg" alt="" />
					</div>
				</div>
			</div>
		</div>
  )
}

export default MainSecion
