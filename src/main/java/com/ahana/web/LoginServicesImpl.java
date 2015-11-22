package com.ahana.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/services/rest")
public class LoginServicesImpl {
	
	@RequestMapping(value = "/showLogin" ,method = RequestMethod.GET)
	public final String showLogin(final HttpServletRequest request) {
		HttpSession oldSession = request.getSession(false);
		if (oldSession != null ) {
			oldSession.invalidate();
		}
		SecurityContextHolder.clearContext();
		return "ahanaLogin";
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public final String logout(final HttpServletRequest request) {
		HttpSession oldSession = request.getSession(false);
		if (oldSession != null ) {
			oldSession.invalidate();
		}
		SecurityContextHolder.clearContext();
		return "ahanaShowLogin";
	}

}
