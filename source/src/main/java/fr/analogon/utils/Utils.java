package fr.analogon.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Utils {
    private Logger log= LoggerFactory.getLogger(Utils.class);

    private static SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy",Locale.FRENCH);
    //Convertir objet date en format "dd/MM/yyyy"
    public static String dateToString(Date date){
		String result=date!=null?dateFormat.format(date):"";
		return 	result;	
	}
    //convertir format "yyyy-MM-dd" en objet date
    public static Date stringToDate(String date){
		Date result=null;
        try {
            result = date.isEmpty()?null:dateFormat.parse(date);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
		return 	result;	
	}

    //Convertir Boolean en string et transformer null en false 
    public static String boolToString(Boolean bool) {
        return (bool!=null && bool.booleanValue()) ? "true" : "false";
    }

    //Insérer les paramètres
    public static String replace(String st, String... arg){
        System.out.println("before st="+st);
		for (int i=0;i<arg.length;i++){
			st=st.replace("{"+i+"}", arg[i]);
		}
        System.out.println("after st="+st);
		return st;	
	}

}
