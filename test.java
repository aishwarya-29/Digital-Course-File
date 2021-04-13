import org.antlr.v4.runtime.ANTLRFileStream;
import org.antlr.v4.runtime.ANTLRInputStream;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CommonTokenStream;
public class MyMain {
    public static void main(String[] args){
    	
    	try {
        ANTLRInputStream input=new ANTLRInputStream("aabb");
        HelloLexer lexer = new HelloLexer(input);
        CommonTokenStream tokens=new CommonTokenStream(lexer);
        HelloParser parser=new HelloParser(tokens);     
        System.out.println(parser.equation());
    	}
    	catch(Exception e){
			 System.out.println(e);
		 }
 }
}
