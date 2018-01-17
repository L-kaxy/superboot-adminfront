package com.wteam.superboot;

import java.lang.annotation.Annotation;
import java.lang.reflect.Parameter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.AbstractHandlerMethodMapping;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;

import com.wteam.superboot.security.entity.po.ActionPo;
import com.wteam.superboot.security.repository.ActionRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActionTest {

	@Autowired
	private ApplicationContext applicationContext;

	@Autowired
	private ActionRepository actionRepository;

	@SuppressWarnings("unchecked")
	@Test
	public void getAllRequestMappingInfo() {
		AbstractHandlerMethodMapping<RequestMappingInfo> objHandlerMethodMapping = (AbstractHandlerMethodMapping<RequestMappingInfo>) applicationContext
				.getBean("requestMappingHandlerMapping");
		Map<RequestMappingInfo, HandlerMethod> mapRet = objHandlerMethodMapping.getHandlerMethods();

		Map<String, String> interfaceMap = new HashMap<>();
		for (RequestMappingInfo info : mapRet.keySet()) {
			String interfaceinfo = "";
			Parameter[] parameters = mapRet.get(info).getMethod().getParameters();
			for (Parameter param : parameters) {
				Annotation[] annotations = param.getAnnotations();
				if (annotations.length > 0) {
					if (annotations[0].annotationType().getName()
							.equals("org.springframework.web.bind.annotation.RequestAttribute")) {
						interfaceinfo = "\t登录后";
					}
				}
			}
			interfaceMap.put(info.getPatternsCondition().getPatterns().iterator().next(), interfaceinfo);
		}

		List<ActionPo> actionList = actionRepository.queryList(new ActionPo());
		for (ActionPo action : actionList) {
			if (interfaceMap.containsKey(action.getActionname())) {
				interfaceMap.remove(action.getActionname());
			}
		}
		
		Object[] actions = interfaceMap.keySet().toArray();
		Arrays.sort(actions);
		
		for (Object actionname : actions) {
			if (!actionname.equals("/error")) {
				System.out.println(actionname + interfaceMap.get(actionname));
			}
		}
	}

	@SuppressWarnings("unchecked")
	@Test
	public void getNonRequestMappingInfo() {
		AbstractHandlerMethodMapping<RequestMappingInfo> objHandlerMethodMapping = (AbstractHandlerMethodMapping<RequestMappingInfo>) applicationContext
				.getBean("requestMappingHandlerMapping");
		Map<RequestMappingInfo, HandlerMethod> mapRet = objHandlerMethodMapping.getHandlerMethods();
		
		Map<String, String> interfaceMap = new HashMap<>();
		for (RequestMappingInfo info : mapRet.keySet()) {
			String interfaceinfo = "";
			Parameter[] parameters = mapRet.get(info).getMethod().getParameters();
			for (Parameter param : parameters) {
				Annotation[] annotations = param.getAnnotations();
				if (annotations.length > 0) {
					if (annotations[0].annotationType().getName()
							.equals("org.springframework.web.bind.annotation.RequestAttribute")) {
						interfaceinfo = "\t登录后";
					}
				}
			}
			interfaceMap.put(info.getPatternsCondition().getPatterns().iterator().next(), interfaceinfo);
		}
		
		List<ActionPo> actionList = actionRepository.queryList(new ActionPo());
		for (ActionPo action : actionList) {
			if (!interfaceMap.containsKey(action.getActionname())) {
				System.out.println(action.getActionname());
			}
		}
		
	}
}
