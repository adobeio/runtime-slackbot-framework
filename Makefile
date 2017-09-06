# @author Esteban Posada <posada@adobe.com>
# Makefile to execute the configuration java file. This is purely done just to make
# life easier to developers. We are here to help.

JFLAGS = -g
JC = javac
.SUFFIXES: .java .class
.java.class:
	@$(JC) $(JFLAGS) $*.java

CLASSES = \
	Configure.java

default: classes

classes: $(CLASSES:.java=.class)

run: default
	@java Configure
clean:
	@$(RM) *.class;$(RM) info.txt
