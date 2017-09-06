# Copyright [yyyy] [name of copyright owner]
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# @author Esteban Posada <epm105@hotmail.com>
# @copyright Adobe Systems Inc.
# @version 1.0 - first release
# @license Apache License, Version 2.0
#
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
