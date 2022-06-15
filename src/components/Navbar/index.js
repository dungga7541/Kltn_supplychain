import React, { Component } from 'react';
import "./navbar.css";
class NavBar extends Component {
    render() {
        
        return (
            <div>
                <div className="horizontal_menu">
                    
                    <ul>
                    <li><a className="active"  href="/">Trang chủ</a></li>
                    <li><a href='/manufacturer'>Đăng sản phẩm</a></li>
                    
                    </ul>
                </div>
            </div>
        );
    }
}

export default NavBar;