package com.ahana.web;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

public class AjaxSessionExpirationFilter implements Filter {
	
	private static Logger logger = Logger.getLogger(AjaxSessionExpirationFilter.class);

	private int customSessionExpiredErrorCode = 901;

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filerChain)
			throws IOException, ServletException {
		HttpSession currentSession = ((HttpServletRequest) request).getSession(false);
		if (currentSession == null) {
			String ajaxHeader = ((HttpServletRequest) request).getHeader("X-Requested-With");
			if ("XMLHttpRequest".equals(ajaxHeader)) {
				logger.info("Ajax call detected, send {} error code"+ this.customSessionExpiredErrorCode);
				try {
					RequestDispatcher dispatcher = request.getRequestDispatcher("/services/rest/local/showLogin");
					dispatcher.forward(request,response);
				} catch (ServletException e) {
					logger.error("Authentication object not found redirecting to login page : "+e.getMessage());
				} catch (IOException e) {
					logger.error("Authentication object not found redirecting to login page : "+e.getMessage());
				}
			}
			filerChain.doFilter(request, response);
		}
	}

	@Override
	public void destroy() {
	}
}
